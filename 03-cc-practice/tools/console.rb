require_relative '../config/environment.rb'

dan = Lifter.new('dan', 7)
lucy = Lifter.new('lucy', 60)

l_boat = Gym.new('Lucy\'s boat')
d_house = Gym.new('Dan\'s house')
va = Gym.new('Virgin Active')

m1 = Membership.new(30, dan, l_boat)
m2 = Membership.new(4398, dan, d_house)
m3 = Membership.new(120, dan, va)
m4 = Membership.new(12, lucy, d_house)
m5 = Membership.new(1320, dan, va)

binding.pry
puts "amazing"
