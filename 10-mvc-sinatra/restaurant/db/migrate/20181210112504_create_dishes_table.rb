class CreateDishesTable < ActiveRecord::Migration
  def change
    create_table :dishes do |t|
      t.string :name
      t.integer :price
    end
  end
end
