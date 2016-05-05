class Api::SessionsController < ApplicationController

	def create
		@user = User.find_by_credentials(params[:user][:username], params[:user][:password])
		if @user
			log_in!(@user)
			render 'api/users/show', status: 200
		else
			error = ["Invalid username or password"]
			render json: error, status: 404
		end
	end

	def destroy
		log_out!
		render json: ["Successfully logged out!"], status: 200
	end

end
