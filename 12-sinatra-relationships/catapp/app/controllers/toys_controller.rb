class ToysController < ApplicationController

  get "/toys/new" do
    @cats = Cat.all
    erb :"toys/new"
  end

  post "/toys" do
    binding.pry
    toy = Toy.create(params[:toy])
    redirect "/cats/#{toy.cat_id}"
  end
end
