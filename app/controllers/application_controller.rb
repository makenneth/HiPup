class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    return nil unless session[:session_token]

  	@current_user ||= User.find_by_session_token(session[:session_token])

    if params[:geolocation] && cookies[:geolocation] != params[:geolocation]
      cookies[:geolocation] = params[:geolocation]
    end
    return @current_user
  end

  def log_in!(user)
    @current_user = user
    new_session = Session.create(user_id: @current_user.id, session_token: Session.generate_session_token)
  	session[:session_token] = new_session.session_token
  end

  def log_out!
  	current_user.destroy_session_token!(session[:session_token])
  	@current_user = nil
  	session[:session_token] = nil
  end


  def current_user_info
    return nil unless current_user
    User.includes(:joined_groups, :joined_events).find(current_user.id)
  end

  def get_geolocation
    location = cookies[:geolocation]
    if location
      l = JSON.parse(location)
      return [l["lat"], l["lng"]]
    end

    if current_user
      return [current_user.lat, current_user.lng]
    end
  end
  helper_method :current_user, :current_user_info
end
