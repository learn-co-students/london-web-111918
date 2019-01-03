Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  resources :doctors
  resources :chickens

  # user account management
  get '/signup', to: 'users#new', as: 'signup'
  post '/signup', to: 'users#create'
  get '/users/:id', to: 'users#show', as: 'user'

  # sessions management
  get '/login', to: 'sessions#new', as: 'login'
  post '/sessions', to: 'sessions#create', as: 'sessions'
  post '/logout', to: 'sessions#destroy', as: 'logout'
end
