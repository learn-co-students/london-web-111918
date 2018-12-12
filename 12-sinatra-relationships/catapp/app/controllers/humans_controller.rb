class HumansController < ApplicationController

  # index
  get "/humans" do
    @humans = Human.all
    erb :"humans/index"
  end

  # new
  get "/humans/new" do
    @cats = Cat.all
    erb :"humans/new"
  end

  # create
  post "/humans" do
    binding.pry
    human = Human.create(params[:human])
    redirect "/humans/#{human.id}"
  end

  # show
  get "/humans/:id" do
    @human = Human.find(params[:id])
    erb :"humans/show"
  end

  # edit
  get "/humans/:id/edit" do
    @human = Human.find(params[:id])
    erb :"humans/edit"
  end

  # update
  patch "/humans/:id" do
    human = Human.find(params[:id])
    human.update(params[:human])
    redirect "/humans/#{human.id}"
  end

end
