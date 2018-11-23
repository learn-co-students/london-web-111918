# Ruby MTM

## Domain modelling

- Doctors & Patients
- Drivers & Passengers

We know models are classes that store data. Where in this domain could we store the data about what time the patient is scheduled to meet the doctor? What is the relationship between these two models?

A doctor has many appointments / appointment belongs to the doctor
A patient has many appts / appt belongs to patient

*and now the new bit*

A doctor has many patients *through* appointments
A patient has many doctors *through* appointments

- Question - when we create a new appointment instance, what are the dependencies? 

```ruby
class Like

  attr_accessor :user, :tweet

  @@all = []

  def self.all
    @@all
  end

  def initialize(user, tweet)
    @user = user
    @tweet = tweet
    @@all << self
  end


end
```

```ruby
# in user class

   def like_tweet(tweet)
    Like.new(self, tweet)
  end

  # return a collection of only the likes that belong to this user
  def likes
    # look through all of the likes
    Like.all.select do |like|
      like.user == self
    end
  end
```

Student exercise:
```ruby
def liked_tweets

end
```
