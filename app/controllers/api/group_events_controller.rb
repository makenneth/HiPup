class Api::GroupEventsController < ApplicationController
	def index
		#filter by time
		@group_events = GroupEvent.where("event_time > ?", time.now).order(:event_time)
	end

	def create
		@group_event = GroupEvent.new(group_event_params)
		if @group_event.save
			render :show
		else
			render json: @group_event.errors.full_messages, status: 422
		end
	end

	def show
		if params[:query_type] == "time"
			@group_event = GroupEvent.includes(:event_participants).find(params[:id])
		elsif params[:query_type] == "location"
		end
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
