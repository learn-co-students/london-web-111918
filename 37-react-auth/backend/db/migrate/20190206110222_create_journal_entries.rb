class CreateJournalEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :journal_entries do |t|
      t.string :note
      t.string :mood
      t.string :location
      t.integer :user_id

      t.timestamps
    end
  end
end
