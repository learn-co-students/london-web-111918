class CreateUnicornsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :unicorns do |t|
      t.string :name
      t.integer :number_of_horns
      t.string :fluffiness
    end
  end
end
