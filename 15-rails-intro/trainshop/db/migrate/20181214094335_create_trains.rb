class CreateTrains < ActiveRecord::Migration[5.2]
  def change
    create_table :trains do |t|
      t.string :name
      t.integer :price
      t.boolean :cool

      t.timestamps
    end
  end
end
