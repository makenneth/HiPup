class Api::TagsController < ApplicationController
  def index
    tags_json = $redis.get('tags')
    unless tags_json
    	@tags = Tag.includes(:groups)
      tags_json = render_to_string(formats: 'json')
      $redis.set('tags', tags_json)
    end

    render json: tags_json, status: 200
  end

  def show
  	@tag = Tag.includes(:groups).find(params[:id])
  end
end
