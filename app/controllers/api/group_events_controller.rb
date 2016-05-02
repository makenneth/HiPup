class Api::GroupEventsController < ApplicationController
	def index
		#don't think we need index
	end

	def create
		@group_event = GroupEvent.new(group_event_params)
		if @group_event.save
			render :show
		else
			debugger
			render json: @group_event.errors.full_messages, status: 422
		end
	end

	def show
		#show should be nested under events
		@group_event = GroupEvent.find(params[:id])
	end

	def update

	end

	def destroy
		#this is just going to alter the event to cancel if there are participants
	end

	private
	def group_event_params
		params.require(:group_event).permit(:lat, :lng, :street, :city, 
								:state, :zip, :title, :description, :date, :time, :group_id)
	end
end
