class Api::UsersController < ApplicationController
	def show
		@user = User.includes(:groups, joined_events: [:group, :event_users]).find_by_session_token(session[:session_token])
		if @user
			render :show
		else
			render json: ["Not Logged In"], status: 404
		end
	end

	def create
		@user = User.new(user_params)
		if @user.save
			log_in!(@user)
			render json: @user
		else
			render json: @user.errors.full_messages, status: 422
		end
	end

	def update
		@user = current_user
		unless @user.is_password?(params[:user][:old_password])
			render json: ["Old password doesn't match record"], status: 422
			return
		end

		@user.password = params[:user][:new_password]
		if @user.save
			render :show
		else
			render json: @user.errors.full_messages, status: 422
		end
	end

	private
	def user_params
		params.require(:user)
				.permit(:username, :password, :lat, :lng, :email, :name, :owner_name, :city, :state)
	end
end
