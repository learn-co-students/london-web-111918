Rails.application.routes.draw do
  resources :images, only: [:index, :show, :create]
  resources :comments, only: [:index, :show, :create]
  post 'likes', to: 'images#increase_likes'
end
