# Rails Backend with JWT Auth

We'll be building a journaling app. Kind of like http://dayoneapp.com/ or http://daylio.webflow.io/
Just slightly more _beta_

## Setup to run the finished code

- clone both repos
- `yarn` on frontend, then `npm start`
- `bundle` on backend, `rails db:setup` (you might have to do `rails db:migrate`, too) the `rails s`

## Build it yourself!

First let's get the basics up...

### Set up a basic Rails API

- Create a new rails API app
  `rails new backend --api --database=postgesql`

- Create the journal entry model:
  `rails g scaffold JournalEntry note mood location`

- Create the user model

  - `rails g scaffold user email password_digest admin:boolean`
  - in models/user.rb add the following line to make sure password is stored as a hash
    `has_secure_password`
  - also add the relatinship to the JournalEntry
    `has_many :journal_entries, dependent: :destroy`
  - your User model should now look like this:
    ```
    class User < ApplicationRecord
      has_secure_password
      has_many :journal_entries, dependent: :destroy
    end
    ```

- To make it the secure password storage work, we need bcrypt.
  - In the Gemfile, uncomment: `gem 'bcrypt', '~> 3.1.7'`
  - run `bundle`
  - change migrations to make sure users aren't admins by default
    - `db/migrates/xxxxxx_create_users.rb` -->`t.boolean :admin, default: false`
  - change the migration of the journal to include the user_id reference
    - `db/migrate/xxxx_create_journal_entries.rb` ---> add `t.integer :user_id`

* Now go ahead and run your migrations
  `rails db:migrate`
* add initial data:

  - `rails c`
  - `User.create(email: 'user@journal.com', password: 'user', password_confirmation: 'user')
  - `User.create(email: 'admin@journal.com', password: 'admin', password_confirmation: 'admin', admin: true)
  - `JournalEntry.create(note: 'First entry!!!', mood: 'feeling elated', location:'Flatiron School', User.first.id)`
  - `JournalEntry.create(note: 'Had pasta for breakfast', mood: 'great', location:'Kitchen', User.second.id)`
  - `exit`

  Hold on, doesn’t our user table only have a password_digest column? What is this password and password_confirmation business?

  Well, that’s where the magic of bcrypt and has_secure_password comes in. It takes those two entries and turns them into a secure, encrypted password_digest.

* start rails server on port 3003 `rails s -p 3003`

### Create the frontend (in frontend repo)

- `create-react-app frontend && cd frontend`

- `yarn add react-router-dom grommet styled-components normalize.css`

  - https://v2.grommet.io/ for UI, it uses https://www.styled-components.com ! <3
  - and react router of course for the routing

- add proxy to package.json use relative URLs for API fetches

  - `"proxy": "http://localhost:3003"`
  - make sure the port is the same as the port you're running the rails server on.

- create basic frontend with add/edit functionality
  - add a `JournalContainer` component that
    - has an intial state (empty array of journal_entries)
    - will fetch `/api/v1/journal_entries` on componentDidMount
    - stores the fetch result in state
    - renders a list of entries on one side of the screen
    - has space an edit form on the other side of the screen
  - add a <Router> from 'react-router-dom' as your wrapping component in the render function of App.js
    - make sure you `yarn add react-router-dom` or `npm install -s react-router-dom`
  - add main routes in your App.js
    - /journal`renders the`<JournalContainer>`
    - add a catch-all route (no path) that displays a 'page not found' for now
  - test that you can navigate to `/journal` and get an 'page not found' on any other URL
    - `/journal` should render all notes from all users (obvs that's not what we want, we'll get to that)
  - `<JournalContainer>` has sub routes:
    - `/journal/new` - to create a new entry
    - `/journal/:id` - to edit an exiting entry with the id specified in the URL
  - Create an EditForm component
    - it'll take props:
      - `entry` - an object with the details of the journal entry
      - `onSubmit` - a callback toSave the new/edited entry
    - if we give it an entry, it'll set the inital state to `props.entry` and render the form with the details of that entry
    - if we don't give it an entry prop, it'll start with an "empty" state (no id, we don't have one yet)
    - on submit, it'll call the callback function with this.state as the argument
  - in `<JournalContainer>` add the callback function to save a journal entry
    - let's call it `handleJournalSubmit`
    - if the function parameter (coming from state of EditForm) has an id, we know we're updating
      - we'll be creating a PATCH request to `/api/v1/journal_entries/${id}`
    - if it has NO id, we know we're creating a new one
      - we'll be creating a POST request to `/api/v1/journal_entries/`
    - if the fetch succeeds, update state to:
      - change the entry in state (where the id matches) if we did an update
      - add the entry to the state.entries, if we created a new one
    - after the state updated, redirect to the url of the new entry

### Now what?

Anyone accessing the app can have access to all notes?!
So far we fetched all entries and let anyone edit any entries, let’s add authentication.

We'll be using JWTs do to that.

### What is a JWT?

This explanation is pretty good....
https://jwt.io/introduction/

Tokens are a little bit of data that the server issues and sends to the browser. It's got three pieces:

- the `head` - it comes with info about the token, especially whatn kind of hashing it uses. (unencrypted)
- the `payload` - information about the user and the token. e.g. username, email and expiration date (unencrypted)
- the `signature` - a hashed string computed form the above two parts plus a secret only the server knows about

### Tokens use Hashes? What's a hash?

You can think of hashing as one-way-encryption. Complicated math that turns a string into a pile of random looking characters.
The important bit is that the same input ALWAYS results in the same output. List like the password hashing above to store the password in the database, we use the same algorithms to calculate the signature of our token.

On each request we'll send the token back to the server in an `Authorization` header of our request.
The server checks if the token is valid by recomputing the signature with the token contents and the secret that is stored on the server. If anyone has tampered with the token, the signature hash calculated today won't be the same as the signature in the token. So the server will respond with an `Unauthorized` response.

If the signature calculated is the same as the one in the token, we can fetch the User data from the database (form the user id or email stored in the token payload) and fullfill the request.

### Using the Knock Gem to help us issue tokens.

You can do this by hand, the labs do this really nicely. Today we'll concentrate on JWTs and why they're cool.

- Add the knock gem to your Gemfile: gem 'knock'
- Run bundle, and then set up knock’s user authentication with the following commands:
  - `rails g knock:install`
  - `rails g knock:token_controller user`

Great, that added a line to our `config/routes.rb` file that says, `post 'user_token' => 'user_token#create'`

This means that if a POST request is sent to the /user_token address, it will be sent to the user_token controller knock created. If the credentials in the POST request are valid (email and password), knock will use its create method to give us a token.

Also see the user routes in there, look at JSON returned from users API endpoint in browser....
No password, just a hash! Nice, so even if we accidentally leak the user data, the hashing of the password makes it hard for hackers to log in as a user, because it's really hard to reverse a hash. Basically you have to try every possible password until you find the right one... Still, we don't want to expose plain users at all...
Let’s delete `resources :users`.

Move the `user_token` route under the API scope. Your code should look like this:

```
 Rails.application.routes.draw do
   scope '/api' do
     scope '/v1' do
      resources :journal_entries
      post 'user_token' => 'user_token#create'
     end
   end
 end
```

Now that we have an access point to get a token, let’s start restricting access to resources.
Change your `app/controllers/application_controller.rb` file to give us access to knock:

```
class ApplicationController < ActionController::API
  include Knock::Authenticable
end
```

Since our resource controllers (for journal_entries and users) inherit the application controller, they’ll all have access to knock’s methods.

### Only allow users in our database to see journal entries.

Add a line to the top of app/controllers/journal_entries_controller.rb , so it becomes:

```
class JournalEntriesController < ApplicationController
  before_action :authenticate_user
  before_action :set_journal_entry, only: [:show, :update, :destroy]
```

- `:authenticate_user will` make sure people making requests to these routes have a valid JSON web token.
- If you refresh the frontend, you get an error now `Unauthorized`

### Frontend Changes

- Add `<LoginForm>` container to frontend
  - with fields:
    - `email`
    - `password`
  - a callback prop 'onSubmit' coming from App.js
    - POST `{auth: { email, password}}` to `/api/v1/user_token`

### Finishing the backend

- The request for the token errors out with `unprocessable_entity`

  - We got some CORS Issues!
    - in Gemfile, uncomment `rack-cors` and run `bundle`
    - in `config/initializers/cors.rb` uncomment code and change `origins '*'`
  - Also Rails runs another RequestForgeryProtection check that stops us form getting to the controller.
    - in your `user_token_controller` -> add `skip_before_action :verify_authenticity_token`
      Your file should now look like this:
      ```
      class UserTokenController < Knock::AuthTokenController
        skip_before_action :verify_authenticity_token
      end
      ```
  - If you're using rails > 5.1, we need to change the config, Knock was written for rails <= 5.1
    - go to `initializers/knock.rb and`
    - Find the section that is titled Signature Key
    - the comment will say `# config.token_secret_signature_key = -> { Rails.application.secrets.secret_key_base }` leave it commented out, but on the line after...
    - add `config.token_secret_signature_key = -> { Rails.application.credentials.fetch(:secret_key_base) }``

- Try logging in again. It works!
- Look at token, there's no real info
- We can overwrite the `to_token_payload` method un the User model to add more info to the token:

  ```
  def to_token_payload
    {
      sub: id,
      email: email
    }
  end
  ```

  - Your models/user.rb should now look like this:

    ```
    class User < ApplicationRecord
      has_secure_password

      has_many :journal_entries, dependent: :destroy

      def to_token_payload
        {
          sub: id,
          email: email
        }
      end
    end
    ```

### Finish login functionality

- Try and log in again, it should work now.
- once the fetch returns the token, console log it, have a look!

  - copy the content of the token and enter it into the debugger at jwt.io
  - everyone can read the token
  - only who holds the secret (our rails server) can verify the signature

- save the token into local storage.
  `window.localStorage.setItem('auth_token', token)`
- get content of token to save in app state (we really only care about the email)
  - something like `this.state.auth = {tokenContent}`
- after state has been set, redirect to `/journal`
  - we need access to history, but we're in App.js so we can't use `withRouter` either:
    - nest all the login functionality one level deeper (in `AuthContainer` or something similar)
    - or get access to history in our `App.js`:
      - `yarn add history` to install the history package (that BrowserRouter uses under the hood!)
      - `import { createBrowserHistory } from 'history'`
      - make sure you `import { Router} from 'react-router-dom'` not `{ BrowserRouter as Router }`
      - outside your component class initialize `const history = createBrowserHistory()`
      - then we can use `<Router history={history}>` to initialise the Router with the history object we just made and....
  - use `history.push('/journal')` in the callback from setState.

### Authorizing API calls

- login works, but fetch of journal entries fails now.
  - add `Authorization` headers to all API calls!
    ```
    headers: {
      Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      "content-type": "application/json"
    },
    ```
  - That's all.

### Persisting the Login

We stored the token in localStorage, so we have access it even after a refresh of the page.
The app state however gets lost on refresh.

- In your constructor function of `App.js` check if the token exists in localStorage.
- Parse it, and save the contents back to state and you're ready to go.

### Authorized Routes

React Router docs have a nice example how to authorize routes:

https://reacttraining.com/react-router/web/example/auth-workflow

### Logout

- To log out, delete the token from localStorage and clear state (the email we saved)

## Further resources:

- [Blog: Build Rails JWT Auth from scratch](https://www.thegreatcodeadventure.com/jwt-auth-in-rails-from-scratch/)
- [Rails JWT library](https://github.com/jwt/ruby-jwt/blob/master/README.md)
- [Blog: Knock JWT Auth on Rails](https://medium.com/@nick.hartunian/knock-jwt-auth-for-rails-api-create-react-app-6765192e295a) (a bit older, uses JQuery for fetch, etc...)
