[CRUD vs REST](https://image.slidesharecdn.com/restvssoap-130104080511-phpapp01/95/rest-vs-soap-40-638.jpg?cb=1357286773)

[RESTful routes](https://i.imgur.com/omvB7JJ.png)

[html forms](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form)

## What will we be doing:

- CRUD, REST, HTTP; The acronym festival
- Implementing RESTful routing for one resource
- Write html templates w/ `erb`
- Build params hashes from forms

## #RESTful routing for our resource: the DOG

| Name | Path | HTTP Verb | Purpose |
| --- | --- | --- | --- |
| Index | /dogs | GET | List all dogs |
| New  | /dogs/new | GET | Show new dog *form* |
| Create | /dogs | POST | Create a new dog, then redirect  |
| Show | /dogs/:id | GET | Show info about ONE specific dog |
| Edit | /dogs/:id/edit | GET | Show edit *form* for one dog |
| Update | /dogs/:id | PUT | Update a particular dog, redirect |
| Destroy | /dogs/:id | DELETE | Delete a particular dog, then redirect |

## Flow

- `corneal new dogApp`
- `bundle`

```ruby
# rakefile
task :console do
  Pry.start
end
```

```ruby
# models/dog.rb
class Dog < ActiveRecord::Base

end
```

- `rake db:create_migration NAME=create_dogs_table`

```ruby
# migration file
class CreateDogsTable < ActiveRecord::Migration
  def change
    create_table :dogs do |t|
      t.string :name
      t.integer :age
    end
  end
end
```

## Let's get some dogs created on the command line

READ

```ruby
# dogs_controller.rb

class DogsContorller < ApplicationController
  get "/dogs" do
    @dogs = Dog.all
    erb :"dogs/index"
  end

    get "/dogs/:id" do
    @dog = Dog.find(params[:id])
    erb :"dogs/show"
  end
end
```

```ruby
# config.ru
use DogController
```

- create a index view for Dog! Mimic that behaviour for every kind of REST endpoint that needs a view. Which ones do?
- https://loremflickr.com/

CREATE
```ruby
  get "/dogs/new" do
    erb :"dogs/new"
  end

  post "/dogs" do
    dog = Dog.create(params[:dog])
    redirect "/dogs/#{dog.id}"
  end
```

CREATE FORM
```html
<h1>Create new Dog</h1>

<a href="/dogs">Go back</a>

<form action="/dogs" method="post">
  <div>
    <label for="">Name:</label>
    <input type="text" name="dog[name]" />
  </div>
  <div>
    <label for="">Age:</label>
    <input type="text" name="dog[age]" />
  </div>
  <input type="submit" value="Create new Dog" />
</form>
```

### Caveat on PATCH and DELETE
- What kind of requests are browsers able to do by default?
- in config.ru `use Rack::MethodOverride`
- Why? [Here's the Link](https://stackoverflow.com/questions/165779/are-the-put-delete-head-etc-methods-available-in-most-web-browsers)

UPDATE
```ruby
  get "/dogs/:id/edit" do
    @dog = Dog.find(params[:id])
    erb :"dogs/edit"
  end

  patch "/dogs/:id" do
    dog = Dog.find(params[:id])
    dog.update(params[:dog])
    redirect "/dogs/#{dog.id}"
  end
```

EDIT FORM
```html
<h1>Edit Dog</h1>

<a href="/dogs/<%= @dog.id %>">Go back</a>

<form action="/dogs/<%= @dog.id %>" method="post">
  <input type="hidden" name="_method" value="patch" />
  <div>
    <label for="">name:</label>
    <input type="text" name="dog[name]" value="<%= @dog.name %>" />
  </div>
  <div>
    <label for="">age:</label>
    <input type="text" name="dog[age]" value="<%= @dog.age %>" />
  </div>
  <input type="submit" value="Edit Dog" />
</form>

<form action="/dogs/<%= @dog.id %>" method="post">
  <input type="hidden" name="_method" value="delete" />
  <input id="mysubmit" type="submit" value="Delete Dog" />
</form>
```

DELETE
```ruby
  delete "/dogs/:id" do
    dog = Dog.find(params[:id])
    dog.destroy
    redirect "/dogs"
  end
```
