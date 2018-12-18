  <%= form_for(@post) do |f| %>
    <%= f.label :title %>
    <%= f.text_field :title %>

    <%= f.label :content %>
    <%= f.text_area :content %>

    <%= f.label :user %>

      # First arg is method we want to call on @post (:user_id),
      # Second The collection we want to use to populate the dropdown(User.all),
      # Third The value we want in our params: User#id,
      # Fourth What do we want to display in the tag itself? User#name

  <%= f.collection_select(:user_id, User.all, :id, :name) %>
  <%= f.submit %>
<% end %>

#-------------------

class User < ApplicationRecord
  has_many :posts, dependent: :destroy
  # provide methods like User#posts
end

class Post < ApplicationRecord
  belongs_to :user
end
