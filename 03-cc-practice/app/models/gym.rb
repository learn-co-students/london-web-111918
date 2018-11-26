class Gym

    attr_accessor :name

    @@all = []

    def initialize(name)
      @name = name
      @@all << self
    end

    def self.all
      @@all
    end

    def memberships
      Membership.all.select {|m| m.gym == self}.uniq
    end

    def lifters
      memberships.map {|m| m.lifter}.uniq
    end

    def lifter_names
      lifters.map { |l| l.name }
    end

    def combined_lift_total
      lift_total = 0
      array_of_lift_totals = lifters.map { |l| l.lift_total }
      array_of_lift_totals.each do |lt|
        lift_total += lt
      end
      lift_total
    end
end
