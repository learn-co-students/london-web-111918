class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def show
    authorized_for(params[:id])
    @user = User.find(params[:id])
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      @user.save
      session[:user_id] = @user.id
      redirect_to doctors_path
    else
      redirect_to signup_path
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :password)
  end

end
