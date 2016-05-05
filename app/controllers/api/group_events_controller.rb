class Api::GroupEventsController < ApplicationController
	def index
		#filter by time
		if params[:query_type] == "time"
			@group_events = GroupEvent.includes(:group).where("event_time > ?", Time.now).order(:event_time)
		elsif params[:query_type] == "location"
			#lat lng within 25miles
		end
	end

	def create
		@group_event = GroupEvent.new(group_event_params)
		if @group_event.save
			EventUser.create(user_id: @group_event.host_id, event_id: @group_event.id)
			render :show
		else
			render json: @group_event.errors.full_messages, status: 422
		end
	end

	def show
			@group_event = GroupEvent.includes(:event_participants).find(params[:id])
	end

	def update

	end


	def cancel
		@group_event = GroupEvent.find(params[:id])
		if @group_event.host_id != params[:user_id].to_i
			render json: ["No permission"], status: 403
		else
			@group_event.status = "CANCEL"
			@group_event.save
			render :show	
		end
	end

	private
	def group_event_params
		params.require(:group_event).permit(:lat, :lng, :street, :city, 
								:state, :zip, :title, :description, :date, :time, :group_id, :host_id)
	end
end
