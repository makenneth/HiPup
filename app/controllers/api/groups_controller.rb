class Api::GroupsController < ApplicationController
	def index
		@groups = Group.includes(:tags, :participants).limit(20)
		@location = get_geolocation
	end

	def show
		group_json = $redis.get("group:#{params[:id]}")

		unless group_json
			@group = Group
				.includes(:participants, :images, :tags, :group_events)
				.find(params[:id])
			group_json = render_to_string(formats: 'json')
		end

		render json: group_json, status: 200
	end

	def create
		params = group_params
		tag_ids = params.delete(:tag_ids)
		tag_ids = tag_ids.map(&:to_i) if tag_ids

		@group = Group.new(params)

		ActiveRecord::Base.transaction do
			@group.save!
			@group.tag_ids = tag_ids
			GroupParticipant.create!(
				group_id: @group.id,
				participant_id: @group.creator_id
			)
			p "Save success #{@group}"
			render :show, status: 200
			return
		end

		render json: @group.errors.full_messages, status: 422
	end

	def update
		@group = Group.find(params[:id])
		if @group.update(group_params)
			$redis.set("group:#{params[:id]}", @group)
			render :show, status: 200
		else
			render json: @group.errors.full_messages, status:422
		end
	end

	def destroy
		@group = Group.find(params[:id])
		if @group.destroy
			$redis.del("group:#{params[:id]}")
			render json: @group, status: 200
		else
			render json: ["Not found"], status: 404
		end
	end

	private
	def group_params
		params.require(:group).permit(
			:title, :description, :lat,
			:lng, :image_url, :creator_id,
			:city, :state, tag_ids: []
		)
	end
end
