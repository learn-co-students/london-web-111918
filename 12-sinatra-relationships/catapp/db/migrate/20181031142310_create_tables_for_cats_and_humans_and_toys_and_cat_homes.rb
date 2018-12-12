class CreateTablesForCatsAndHumansAndToysAndCatHomes < ActiveRecord::Migration
  def change
    create_table :cats do |t|
      t.string :name
      t.string :breed
    end

    create_table :humen do |t|
      t.string :name
    end

    create_table :toys do |t|
      t.string :name
      t.integer :cat_id
    end

    create_table :cat_homes do |t|
      t.integer :cat_id
      t.integer :human_id
    end
  end
end
