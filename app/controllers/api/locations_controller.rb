class Api::LocationsController < ApplicationController
  def create
    coords = {
      lat: params["coords"]["lat"],
      lng: params["coords"]["lng"]
    }
    cookies[:geolocation] = coords.to_json

    Thread.new do
      if current_user && current_user.should_update_location?(coords)
        current_user.lat = coords[:lat]
        current_user.lng = coords[:lng]
        current_user.save
      end
    end

    render json: params[:coords], status: 200
  end
end