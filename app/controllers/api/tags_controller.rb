class Api::TagsController < ApplicationController
  def index
    tags = $redis.get('tags')
    unless tags
    	@tags = Tag.includes(:groups)
      $redis.set('tags', @tags.to_json)
    else
      @tags = JSON.parse(tags)
    end
  end

  def show
  	@tag = Tag.includes(:groups).find(params[:id])
  end
end
