class CommentsController < ApplicationController
  def index
    @comments = Comment.all
    render json: @comments
  end

  def show
    @comment = Comment.find(params[:id])
    render json: @comment
  end

  def create
    @comment = Comment.new(content: params[:content], image_id: params[:image_id])
    if @comment.save
      render json: @comment
    else
      render json: {error: "Unable to create image."}, status: 400
    end
  end
end
