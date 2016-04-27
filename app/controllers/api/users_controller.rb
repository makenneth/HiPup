class Api::UsersController < ApplicationController

	def show
		if current_user
			render json: current_user
		else
			render json: nil
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

	private
	def user_params
		params.require(:user).permit(:username, :password, :lat, :lng, :email, :name, :owner_name)
	end
end
