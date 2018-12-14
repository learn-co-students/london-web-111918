# Rails

[html course](https://learn.shayhowe.com/html-css/)

What's different?

- Making a model
the old way: 3 steps
the new way: `rails g model ????`

- Routing
the old way: route in your controller
the new way: `routes.rb`

- View naming
the old way: `*.erb`
the new way: `*.html.erb`

- Links on pages
the old way: annoying <a> tags
the new way: `link_to`

- Path helpers
the old way: there are none
the new way: `rails/rake routes`


## ---

- `rails -v`
- `rails new <app_name>`
- inspect the file structure
- `routes.rb`
- No more need for the overrides!
- seeds.db ?
- `rake -tasks`
- `rails console`
- `byebug`
- `rails g model <Model_name> name:string price:float number:integer`
- old way of routing: in the controller. new way: controller holds methods that get referred from `routes`
```ruby
class TrainsController < ApplicationController

  def index
    @trains = Train.all
  end

  def show
    @train = Train.find(params[:id])
  end
end
```

- `html.erb`

```ruby
<h1><%= @train.name %></h1>

<p>This train costs £<%= @train.price %></p>


<%= link_to "All Trains", trains_path %>

####

<h1>All trains</h1>

<ul>
  <% @trains.each do |train| %>
    <li><%= link_to train.name, train %></li>
  <% end %>
</ul>
```
- `template rendering only when needed, its implicit`
- `DHH`, `rework`, `37signals` and `basecamp`
- `get /"trains", to: "trains#index"`
- `rails server`
- no more annoying `/route/` error
- `LINK HELPERS!` `link_to <what to show> <where to link to>`
- `PATH HELPERS!`
- `rails routes`
- `link_to trains_path`
- `to 'trans#show', as: 'train'
- `rails routes` `app.train_path(1)`
- `guides.rubyonrails.org`
```ruby
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # get "/trains", to: 'trains#index'
  # get "/trains/:id", to: 'trains#show', as: 'train'

  resources :trains, only: [:index, :show]
end
```
- `resources :trains, only: [:index, :show]`
