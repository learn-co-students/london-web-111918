class CatsController < ApplicationController

  get "/cats/new" do
    @humans = Human.all
    erb :"cats/new"
  end

  post "/cats" do
    binding.pry
    cat = Cat.create(params[:cat])
    redirect "/cats/#{cat.id}"
  end

  get "/cats/:id" do
    @cat = Cat.find(params[:id])
    erb :"cats/show"
  end

end
