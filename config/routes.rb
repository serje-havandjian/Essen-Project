Rails.application.routes.draw do
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  get '/hello', to: 'application#hello_world'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }


  # Route for login after signup
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  # Route for signing up/creating new user
  post "/admin", to: "users#create"
  get "/me", to: "users#show"

end
