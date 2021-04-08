Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  get '/' => 'restaurants#index'
  delete '/delete' => 'foods#delete'
  post '/add' => 'foods#create'
end
