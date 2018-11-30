# What is ActiveRecord
- Check it our here [What is ActiveRecord](https://guides.rubyonrails.org/active_record_basics.html)

## Main Steps

### - Step 1 - Add the model in ruby ('model_name.rb')
### - Step 2 - Create and run migration
### - Step 3 - Verify schema (in console - 'Model.new')

## Takeaways

- ActiveRecord is Awesome!!!

- ActiveRecord does a lot of the heavy lifting for you when creating your database and models and when searching your DB, so you spend more building your apps

- Migrations specifically change the schema i.e. what information we want it to hold

- Migrations create versioning - A history of all changes in the schema (can rollback, delete etc)

- classes/models inherit from ActiveRecord::Base which has bundled code and methods for accessing the database.......NO MORE SQL!! Yippee!

## Creating A Database

### Step 1

- Create the model

```ruby
class ModelName << ActiveRecord::Base
end
```
### Step 2

- Sqlite3 automatically creates the db when using the rake command;

```shell
rake db:create_migration NAME=your_table_name
```

### Step 3

```ruby
def change
  create_table :models do |t|
    t.string :name
    t.string :type
  end
end
```

```shell
rake db:migrate
```

### Check the Schema file

```ruby
ActiveRecord::Schema.define(version: 2018_09_04_133503) do

  create_table "students", force: :cascade do |t|
    t.string "name"
    t.string "norris_quote"
    t.string "favorite_color"
    t.integer "height"
    t.integer "grade"
  end

end
```

```shell
rake console
pry(main)> Model.new
```

### Add a new column

```shell
rake db:create_migration NAME=add_functions_to_model_name
```

```ruby
class AddColumnsToStudents < ActiveRecord::Migration[5.2]
  def change
  	add_column :students, :favorite_color, :string
  	add_column :students, :height, :integer
  	add_column :students, :grade, :integer
  end
end
```

## Important Notes

- Never change the schema manually.
Always look at the schema for information on problems for debugging

-	Run model - check if it works. do ‘ Model.new ‘

- Lots of built in methods (all, find, update, create, find_by)

- If you see something that say def up and def down, they are the same as def change.

- Cannot reuse id’s. Once it’s gone, it’s gone

- find_by takes a string or a hash.
