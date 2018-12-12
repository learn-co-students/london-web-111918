# Forms and Relationships in Sinatra

# YET ANOTHER REMINDER of all the RESTful 7 routes.

| Name | Path | HTTP Verb | Purpose |
| --- | --- | --- | --- |
| Index | /dogs | GET | List all dogs |
| New  | /dogs/new | GET | Show new dog *form* |
| Create | /dogs | POST | Create a new dog, then redirect  |
| Show | /dogs/:id | GET | Show info about ONE specific dog |
| Edit | /dogs/:id/edit | GET | Show edit *form* for one dog |
| Update | /dogs/:id | PUT | Update a particular dog, redirect |
| Destroy | /dogs/:id | DELETE | Delete a particular dog, then redirect |

## What is new that we are learning today?

How to create objects that relate to each other using html forms. Remember, it's nothing new in terms of what we're doing, but it's a novelty in terms of HOW we do it. We'll employ HTML `select` and `checkbox` elements to ease the process of creating these.

Key takeaways are:

Knowing how ...
- the params hash is built
- to nest hashes inside of the params hash
- to nest arrays inside of the params hash
- mass-assignment works in relation to hashes

## Important things that you should solidify during that lecture:

- MVC, REST, CRUD, HTTP.
- once again, how MVC works and what code goes where
- how controllers pass @variables to views
- how to structure nested params when sending forms in HTML (the `human[cat_id][]` bit)

## What will we build?

If you want to recreate the app we're building today, please follow these exact steps:

- `corneal new catregistry`
- `bundle`
- create models
- create and run migrations
- create instances on the command line
- create and set up the controllers
- go through the process of creating all 7 RESTful routes for every model. Test every step thoroughly.

## Important stuff that's easy to forget

- we need to override default browser behaviour, so remember to put `use Rack::MethodOverride` in the `config.ru` file.
