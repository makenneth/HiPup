class Api::GroupEventsController < ApplicationController
	def index
		#don't think we need index
	end

	def create
		
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
		#group id should be grabbed from group_id
		params.require(:group_event).permit(:lat, :lng, :city, 
								:state, :title, :description, :event_time)
	end
end
