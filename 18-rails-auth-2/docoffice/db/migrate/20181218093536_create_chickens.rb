class CreateChickens < ActiveRecord::Migration[5.2]
  def change
    create_table :chickens do |t|
      t.string :name
      t.integer :age
      t.integer :feathers_num

      t.timestamps
    end
  end
end
