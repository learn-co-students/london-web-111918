class CreateRainbowsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :rainbows do |t|
      t.integer :colours
      t.integer :beauty
    end
  end
end
