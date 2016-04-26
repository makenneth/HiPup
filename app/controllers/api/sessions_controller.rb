class Api::SessionsController < ApplicationController

	def create
		@user = User.find_by_credentials(params[:user][:username], params[:user][:password])
		if @user
			log_in!(@user)
			render json: @user
		else
			error = ["Invalid username or password"]
			render json: error, status: 404
		end
	end

	def destroy
		current_user.reset_session_token!
		log_out!
		render status: 200
	end

end
