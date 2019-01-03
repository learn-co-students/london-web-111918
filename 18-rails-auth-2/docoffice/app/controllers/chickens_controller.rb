class ChickensController < ApplicationController
  before_action :find_chicken, only: [:show, :edit, :update, :destroy]

  def index
    @chickens = Chicken.all
  end

  def show
  end

  def new
    @chicken = Chicken.new
  end

  def create
    @chicken = Chicken.create(chicken_params)
    redirect_to chickens_path
  end

  def edit
  end

  def update
    @chicken.update(chicken_params)
    redirect_to chicken_path(@chicken)
  end

  def destroy
    @chicken.destroy
  end

  private

  def find_chicken
    @chicken = Chicken.find(params[:id])
  end

  def chicken_params
    params.require(:chicken).permit(:name, :age, :feathers_num, :doctor_id)
  end

end
