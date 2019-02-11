# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
JournalEntry.destroy_all


admin = User.new
admin.email = 'admin@journal.com'
admin.password = 'admin'
admin.password_confirmation = 'admin'
admin.admin = true
admin.save

user = User.new
user.email = 'user@journal.com'
user.password = 'user'
user.password_confirmation = 'user'
user.save

entries = [
  {
    note: 'Bread',
    mood: 'Joyful',
    location: 'Zurich',
    user_id: User.first.id
  },
  {
    note: 'Bread',
    mood: 'Joyful',
    location: 'Zurich',
    user_id: User.second.id
  },
  {
    note: 'Bread',
    mood: 'Joyful',
    location: 'Zurich',
    user_id: User.second.id
  },
  {
    note: 'Bread',
    mood: 'Joyful',
    location: 'Zurich',
    user_id: User.second.id
  },
]

JournalEntry.create(entries)
