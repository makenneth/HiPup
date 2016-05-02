class Api::ShowUsersController < ApplicationController
	def show
		@user = User.find(params[:id])	
		if @user
			render :show
		else
			render json: ["User Doesn't exist"], status: 404
		end
	end

end
