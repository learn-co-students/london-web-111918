class CreateMobilesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :mobiles do |t|
      t.string :model
      t.integer :driver_id
    end
  end
end
