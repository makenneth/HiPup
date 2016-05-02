class Api::UsersController < ApplicationController

	def show
		if current_user
			render :show
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

	def update
		@user = current_user
		debugger
		if !@user.is_password?(params[:user][:old_password])
			render json: ["Old password doesn't match record"], status: 422
			return
			#error may not be the right format..
		end

		@user.password = params[:user][:new_password]
		if @user.save
			#will this logout the user?
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
