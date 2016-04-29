class Api::EventUsersController < ApplicationController
	def create
		event_user = EventUser.new(event_users_params)
		if event_user.save
			render "api/users/show", status: 200
		else
			render json: event_user.errors.full_messages, status: 422
		end
	end

	def leave
		event_user = EventUser.find_by(event_users_params)
		if event_user.destroy
			render "api/users/show", status: 200
		else
			render ["User Not found"], status: 404
		end
	end

	private
	def event_users_params
		params.require(:event_user).permit(:event_id, :user_id)
	end
end
