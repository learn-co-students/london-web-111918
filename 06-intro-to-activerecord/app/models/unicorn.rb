class Unicorn < ActiveRecord::Base
  belongs_to :rainbow

  def self.charlie
    system 'open https://www.youtube.com/watch?v=JPONTneuaF4'
  end

  def self.need_help_with_active_record
    system 'open https://guides.rubyonrails.org/active_record_basics.html'
  end

end
