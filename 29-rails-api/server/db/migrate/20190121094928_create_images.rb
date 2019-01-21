class CreateImages < ActiveRecord::Migration[5.2]
  def change
    create_table :images do |t|
      t.string :url
      t.string :name
      t.integer :like_count

      t.timestamps
    end
  end
end
