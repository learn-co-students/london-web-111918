class DishesController < ApplicationController

  get '/dishes' do
    @dishes = Dish.all.sort_by {|dish| dish.price}.reverse
    erb :"dishes/index"
  end

  get '/dishes/:id' do
    @dish = Dish.find(params[:id])
    erb :"dishes/show"
  end
end
