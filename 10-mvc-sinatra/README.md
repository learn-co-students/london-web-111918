# Intro to Sinatra and the MVC model

## MVC - convention over configuration

[MVC Diagram](http://kriscroes.github.io/images/blog1/mvc.png)

## REST and CRUD

[CRUD vs REST](https://image.slidesharecdn.com/restvssoap-130104080511-phpapp01/95/rest-vs-soap-40-638.jpg?cb=1357286773)

[RESTful routes](https://i.imgur.com/omvB7JJ.png)

## MVC in Sinatra - App setup

* make sure you have `corenal` installed by running `gem install corneal`

* Create the app with `corneal` by invoking `corneal new <app name>`

* Sinatra file structure

* Making sure we have access to the console via Rake

```ruby
#Rakefile

desc “Console”
task :console do
  Pry.start
end
```

`bundle install`

* Create the model in `app/models`

```ruby
# app/models/dish.rb

class Dish < ActiveRecord::Base
  # no relationships - we just need it to
  # build the tables
end
```

* Make migrations, check the schema

* `rake db:create_migration NAME=create_dishes`

```
Active support warning:
https://guides.rubyonrails.org/active_support_core_extensions.html
```

```ruby
# db/migrate/<migration_timestamp>migration_name
create_table :dishes do |t|
  t.string :name
  t.integer :price
end
```

* `rake db:migrate`

* Create test objects! Make sure to use hashes as arguments when creating AR objects. That happens in the console.

* `shotgun`, concept of a view, `erb`, `layout.erb`, `yield` keyword

[127.0.0.1 There's no place like home](https://i.ytimg.com/vi/A_aw84mQNZE/maxresdefault.jpg)

```ruby
# app/controllers/application_controller.rb

get “/dishes” do
  @dishes = Dish.all.sort_by { |dish| dish.price}
  erb :“dishes/index”
end
```

in the erb file:
```erb
# app/views/dishes/index

<h1> Hello Dishes </h1>

<% @dishes.each do |dish| %>
  <p> <%= dish.name  %> | £<%= dish.price %> </p>
<% end %>
```

* What gets interpolated and how?

* This logic does work in the view as well, but it’s not what you want to do. If computers do not care - why should you?

```ruby
# app/controllers/application_controller.rb

get “/dishes/:id” do
  @dish = Dish.find(params[:id])
  erb :”dishes/show”
end
```

* More examples of how to use `erb` - `<a>` tags, interpolating and adding modularity. What role do params play?

* Move the `dish_controller` logic to its own controller.

```ruby
# app/controllers/dish_controller.rb
DishController < ApplicationController
  # route handlers
end
```

```ruby
# config.ru
...(other code)

use DishController
...(other code)
```

* all should be working as perviously

* How to kill a process you started unwillingly:

1. `lsof -i :9393` where `9393` is the keyword you're looking for, in this example a server process running on port 9393.
2. `kill -9 <process_id>` where `<process_id>` is as per self-explanatory name, the internal id of the process in question. Here you can see example output for performing that operation:

```
[14:56:06] restaurant
// ♥ lsof -i :9393
COMMAND   PID         USER   FD   TYPE             DEVICE SIZE/OFF NODE NAME
ruby    11534 dkaczmarczyk   12u  IPv4 0xdee067917b318809      0t0  TCP localhost:9393 (LISTEN)
```
