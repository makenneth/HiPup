class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
  	@current_user ||= User.find_by(session_token: session[:session_token])
  end

  def log_in!(user)
    @current_user = user
  	session[:session_token] = user.reset_session_token!
  end

  def set_time_zone(time_zone)
    cookies[:time_zone] = time_zone
  end

  def log_out!
  	current_user.reset_session_token!
  	@current_user = nil
  	session[:session_token] = nil
  end


  def current_user_info
    User.includes(:joined_groups, :joined_events).find(current_user.id)
  end
  helper_method :current_user, :current_user_info
end
