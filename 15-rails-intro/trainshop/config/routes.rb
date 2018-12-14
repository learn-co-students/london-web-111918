Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


  # this:
    resources :trains, only: [:index, :show]

  # is equivalent programmaticaly to this
    # get '/trains', to: 'trains#index', as: 'trains'
    # get '/trains/:id', to: 'trains#show', as: 'train'
end
