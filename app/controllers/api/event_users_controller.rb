class Api::EventUsersController < ApplicationController
	def create
		event_user = EventUser.new(user_id: @user.id, event_id: params[:event_id])
		if event_user.save
			render "api/users/show", status: 200
		else
			render json: event_user.errors.full_messages, status: 422
		end
	end

	def destroy
		event_user = EventUser.find_by(user_id: @user.id, event_id: params[:event_id])
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

	def check_if_logged_in
		@user = current_user
		render json: ["Not logged in"], status: 403 unless @user
	end
end
