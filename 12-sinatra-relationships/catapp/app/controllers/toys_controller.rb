class ToysController < ApplicationController

  # new
  get "/toys/new" do
    @cats = Cat.all
    erb :"toys/new"
  end

  # create
  post "/toys" do
    toy = Toy.create(params[:toy])
    redirect "/toys/#{toy.id}"
  end

  # show
  get "/toys/:id" do
    @toy = Toy.find(params[:id])
    erb :"toys/show"
  end

end
