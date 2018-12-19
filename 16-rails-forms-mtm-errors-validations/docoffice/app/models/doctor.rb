class Doctor < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :speciality, presence: true

  has_many :chickens
  has_many :appointments
  has_many :patients, through: :appointments
end
