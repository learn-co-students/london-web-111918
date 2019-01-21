class ImagesController < ApplicationController
  def index
    @images = Image.all
    render json: @images
  end

  def show
    @image = Image.find(params[:id])
    render json: @image
  end

  def create
    @image = Image.new(url: params[:url], name: params[:name], like_count: 0)
    if @image.save
      render json: @image
    else
      render json: {error: "Unable to create image."}, status: 400
    end
  end

  def increase_likes
    @image = Image.find(params[:image_id])
    @image.like_count += 1
    @image.save
    render json: @image
  end
end
