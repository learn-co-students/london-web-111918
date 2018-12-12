class Cat < ActiveRecord::Base
  has_many :toys
  has_many :cat_homes
  has_many :humans, through: :cat_homes
end
