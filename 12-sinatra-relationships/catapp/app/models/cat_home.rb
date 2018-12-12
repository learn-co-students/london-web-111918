class CatHome < ActiveRecord::Base
  belongs_to :human
  belongs_to :cat
end
