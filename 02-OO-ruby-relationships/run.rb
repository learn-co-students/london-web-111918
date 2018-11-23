require 'pry'

class User

  attr_accessor :username
  @@all = []

  def initialize(username)
    @username = username
    @@all << self
  end

  def likes
    Like.all.select do |like|
      like.user == self
    end
  end

  def liked_tweets
    likes.map {|l| l.tweet}
  end

  def own_tweets
    Tweet.all.select do |tweet|
      tweet.user == self
    end
  end

  def self.all
    @@all
  end



  def securely_post_tweet(message)
    post_tweet(message)
  end

  def like_a_tweet(tweet)
    Like.new(self, tweet)
  end

  private

  def post_tweet(message)
    Tweet.new(message, self)
  end
end

class Tweet
  attr_accessor :message, :user
  @@all = []

  def initialize(message, user)
    @message = message
    @user = user
    @@all << self
  end

  def self.all
    @@all
  end

  def likes
    Like.all.select do |like|
      like.tweet == self
    end
  end

  def likers
    likes.map {|l| l.user}
  end

  def self.delete_tweet(tweet)
    @@all.delete(tweet)
  end

  def self.find_tweet(message)
    @@all.find {|t| t.message == message}
  end
end

class Like
  attr_accessor :user, :tweet

  @@all = []

  def initialize(user,tweet)
    @user = user
    @tweet = tweet
    @@all << self
  end

  def self.all
    @@all
  end
end

dan = User.new('Dan')
ed  = User.new('Ed')
oliver = User.new('Oliver')

dan.securely_post_tweet('Hey, I\'m on twitter!')
ed.securely_post_tweet('HI')
oliver.securely_post_tweet('Hello mod1!')
ed.securely_post_tweet('I AM ON TWITTER')
dan.securely_post_tweet('F2F!')
dan.securely_post_tweet('i\'s a rainy day in ldn')

all_tweets= Tweet.all
all_users = User.all

dan.like_a_tweet(Tweet.find_tweet('Hey, I\'m on twitter!'))
dan.like_a_tweet(Tweet.find_tweet('i\'s a rainy day in ldn'))
dan.like_a_tweet(Tweet.find_tweet('Hello mod1!'))
oliver.like_a_tweet(Tweet.find_tweet('Hello mod1!'))


all_likes = Like.all
hm1 = Tweet.find_tweet('Hello mod1!')

binding.pry
p 'eof'
