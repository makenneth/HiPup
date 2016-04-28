class Api::TagsController < ApplicationController
  def index
  	@tags = Tag.includes(:groups)
  end

  def show
  	@tag = Tag.includes(:groups).find(params[:id])
  end	

  def create
  	
  end
end
