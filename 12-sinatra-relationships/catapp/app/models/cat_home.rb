class CatHome < ActiveRecord::Base
  belongs_to :cat
  belongs_to :human
end
