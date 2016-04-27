class Api::GroupsController < ApplicationController
	def index
		@groups = Group.all
	end

	def show
		@group = Group.find(params[:id])
	end

	def create
		@group = Group.new(group_params)
		if @group.save
			render :show, status: 200
		else
			render json: @group.errors.full_messages, status: 422
		end
	end

	def update
		
	end

	def destroy
		
	end
	
	private
	def group_params
		params.require(:group).permit(:title, :description, :lat, :lng, :image_url, :creator_id)
	end
end
