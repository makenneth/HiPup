class Api::TagsController < ApplicationController
  def index
  	@tags = Tag.all
  	render json: @tags, status: 200
  end

  def show
  	@tag = Tag.includes(:groups).find(params[:id])
  end	

  def create
  	
  end
end
