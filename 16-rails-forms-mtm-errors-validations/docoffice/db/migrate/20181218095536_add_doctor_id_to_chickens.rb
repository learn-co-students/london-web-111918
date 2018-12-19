class AddDoctorIdToChickens < ActiveRecord::Migration[5.2]
  def change
    add_column :chickens, :doctor_id, :integer
  end
end
