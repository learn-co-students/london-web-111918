class Membership

    attr_accessor :lifter, :gym, :cost

    @@all = []

    def initialize(cost, lifter, gym)
      @cost = cost
      @lifter = lifter
      @gym = gym
      @@all << self
    end

    def self.all
      @@all
    end

end
