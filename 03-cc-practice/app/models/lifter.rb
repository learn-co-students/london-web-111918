class Lifter

  attr_accessor :name, :lift_total

  @@all = []

  def initialize(name, lift_total)
    @name = name
    @lift_total = lift_total
    @@all << self
  end

  def self.all
    @@all
  end

  def self.avg_lift_total
    all_lift_totals = @@all.map {|l| l.lift_total}
    sum_of_lt = 0
    all_lift_totals.each do |lt|
      sum_of_lt += lt
    end
    # mean value
    sum_of_lt/all_lift_totals.length
  end

  def memberships
    Membership.all.select {|m| m.lifter == self}
  end

  def gyms
    memberships.map {|m| m.gym}
  end

  def cash_spent_on_gyms
    total_cost = 0
    memberships.map {|m| m.cost}.each do |cost|
      total_cost += cost
    end
    total_cost
  end

  def sign_up(gym, cost)
    Membership.new(cost, self, gym)
  end

end
