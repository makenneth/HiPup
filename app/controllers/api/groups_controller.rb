class Api::GroupsController < ApplicationController
	include FileUploader

	def index
		group_json = nil
		@location = get_geolocation
		if @location
			@groups = Group.includes(:tags, :participants)
		else
			groups_json = $redis.get("all_groups")
			unless groups_json
				@groups = Group.includes(:tags, :participants)
				group_json = render_to_string(formats: 'json')
				$redis.set("all_groups", group_json)
			end
			render json: group_json, status: 200
		end

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
		data_params = params[:group]
		tag_ids = data_params.delete(:tag_ids)
		tag_ids = tag_ids.map(&:to_i) if tag_ids
		image = data_params.delete(:image)
		url = upload(image[:filename], image[:content_type], image[:file_contents])
		data_params = data_params.inject({}){|memo,(k,v)| memo[k.to_sym] = v; memo}
		@group = Group.new(data_params)
		@group.image_url = url

		if save_new_group(tag_ids)
			render :show, status: 200
		else
			render json: @group.errors.full_messages, status: 422
		end
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
			:lng, :creator_id, :image,
			:city, :state, tag_ids: []
		)
	end

	def save_new_group(tag_ids)
		ActiveRecord::Base.transaction do
			@group.save!
			@group.tag_ids = tag_ids if tag_ids
			GroupParticipant.create!(
				group_id: @group.id,
				participant_id: @group.creator_id
			)
			p "Save success #{@group}"

			return true
		end

		false
	end
end
