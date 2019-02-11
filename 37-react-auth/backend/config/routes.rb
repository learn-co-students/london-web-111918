Rails.application.routes.draw do
  scope '/api' do
    scope '/v1' do
      resources :journal_entries
      post 'user_token' => 'user_token#create'
    end
  end
end
