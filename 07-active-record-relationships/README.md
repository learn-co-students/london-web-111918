# ActiveRecord Relationships

- Where does ActiveRecord come from again?
- What' this ORM thing?
- Migrations?
- wat
- Model vs Class vs Table // WAT
- CRUD
- WUT

## Our domain today - Pizza

- Eater has many pizzas, so ... `has_many :pizzas`
- PizzaTopping is on a pizza and has toppings, thus it `belongs_to :pizza` and `belongs_to :topping`
- Pizza was bought by someone, so ... `belongs_to :eater`, `has_many :pizza_toppings`, and `has_many :toppings, through: :pizza_toppings`
- Topping is composed of many things and can be reused as a recipte, therefore `has_many :pizza_toppings` and `has_many :pizzas, through :pizza_toppings`

```ruby
# How doe we write our models again?
class ModelNameInCapitalizedCamelCase << ActiveRecord::Base
  # Describe relationships here
end
```

- What is a model again?
- 4 steps you need to take for every model to work:
- - create it
- - generate the migration file and write the contents
- - run the migration, debug anything that needs debugging
- - evaluate the correctness of the schema
- Which models have foreign keys here? How do we know it? What does it even mean? Let's discuss!

SO...

1. Create all models
2. Successfuly get them working with our db (what kind of db is it again? Hint: filedb, not suitable for prod)
3. Create some instances in the console
4. Try to refer to relevant data using instance methods.
5. Bask in AR glory
6. Look at what you've had to write last week
6. Bask again
7. PROFIT   

## References, tricks and notes

- check out `_` in pry
- [AR docs](https://github.com/rails/rails/tree/master/activerecord)
- assigning an array to `topping_ids` on pizza like that: `pizza.topping_ids = [1, 3, 5]`

## AR Methods I've used:

Here's a list of some methods from AR I've used during the lecture. It's not meant to be a comprehensive one, merely a reminder. To get all info about the functionality of AR, remember you should always go to [RAILS GUIDES](https://guides.rubyonrails.org/active_record_basics.html).

- `Pizza.first`(does go to the db)
- `Pizza.find(3)`(does go to the db)
- `Pizza.first.toppings[0].name`(does)
- `hawaiian = Pizza.find_by(name: "Hawaiian")` (does)
- `dan = Eater.first` (does)
- `hawaiian.eater = dan` (doesn't)
- `hawaiian.save` (does)

If you want to completely avoid the headache of stress regarding the db calls, always use `update` (as opposed to updating a local variable and *then* `.save`-ing) to update your data, `find` (as opposed to referring to a variable) to get the newest bits, and `create` (as opposed to `new`) to create.
