class Api::GroupsController < ApplicationController
	def index
		@groups = Group.all
	end

	def show
		@group = Group.includes(:participants).find(params[:id])
	end

	def create
		
	end

	def update
		
	end

	def destroy
		
	end
	
end
