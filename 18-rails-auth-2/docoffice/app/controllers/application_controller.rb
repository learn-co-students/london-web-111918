class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def current_user
    if session[:user_id]
      User.find(session[:user_id])
    else
      User.new
    end
  end

  def logged_in?
    !!current_user.id
  end

  def authorized?
    if !logged_in?
      flash[:authorized] = "you are not logged in"
      redirect_to login_path and return
    end
  end

  def authorized_for(target_user_id)
    if current_user.id != target_user_id.to_i && current_user.admin != true
      flash[:authorized] = "You cannot view a page that does not belong to you!"
      redirect_to doctors_path
    end
  end
end
