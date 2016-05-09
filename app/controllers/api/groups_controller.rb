class Api::GroupsController < ApplicationController
	def index
		if !params[:location_type]
			@groups = Group.includes(:tags)
		elsif params[:location_type] = "closest"
			@groups = Group.closest(params[:user_coord]).includes(:tags)
		elsif params[:location_type] = "other"
			@groups = Group.other(params[:user_coord]).includes(:tags)
		elsif params[:location_type] = "custom"
			@groups = Group.distance_between(params[:user_coord], params[:miles]).includes(:tags)			
		else 
			@groups = Group.default.includes(:tags)
		end
	end

	def show
		@group = Group
								.includes(:participants, :images, :tags, :group_events)
								.find(params[:id])
	end

	def create
		params = group_params
		tag_ids = params.delete(:tag_ids).map(&:to_i)
		@group = Group.new(params)
		if @group.save
			@group.tag_ids = tag_ids
			GroupParticipant.create({group_id: @group.id, participant_id: @group.creator_id})
			render :show, status: 200
		else
			render json: @group.errors.full_messages, status: 422
		end
	end

	def update
		@group = Group.find(params[:id])
		if @group.update(group_params)
			render :show, status: 200
		else
			render json: @group.errors.full_messages, status:422
		end
	end

	def destroy
		@group = Group.find(params[:id])
		if @group.destroy
			render json: @group, status: 200
		else
			render json: ["Not found"], status: 404
		end
	end
	
	private
	def group_params
		params.require(:group)
		.permit(:title, :description, :lat, :lng, :image_url, :creator_id, :city, :state, tag_ids: [])
	end
end
