# Fetch and DOM Manipulation

## Resources
* [MDN Using Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
* [JSON Server](https://github.com/typicode/json-server)

## Example Videos
* [Video1](https://www.youtube.com/watch?v=1jvtdnp33cc)
* [Video2](https://www.youtube.com/watch?v=CKcSkanVYZQ)

### Introduction to SPA
* Introduce them to the concept of SPA and how there is no page reload and no request is ever made to fetch a new webpage (only requests for more data are made)
* Reiterate why async is preferred (superior user experience)
* Show them an example of a simple SPA they can build out in class
* Quickly explain JSON server if needed

##### Example SPAs
![Example2](../assets/FetchDom2.png)

### Planning/Code Structure
* Before jumping into coding, have them plan out the app
* User stories
  - As a user, I should see pokemon when I visit the webpage
  - As a user, I should be able to fill out the form to create a new Pokemon
  - As a user, I should be able to remove Pokemon
* What event listeners will we need?
  - on load of the page
  - on submit of the form
  - on click of a Pokemon (to delete it)
* What functions/pseudo code can we write?

### GET Fetch (rendering objects to the DOM)
* On `DOMContentLoaded`, make a `GET fetch` request and render the contents onto the DOM
* Good idea to show them GET all vs. GET one and how the data looks different (object vs. array)
```
function render(pokemon){
  let pokemonCard = document.createElement('div')
  pokemonCard.innerHTML +=`<div class='card'
    id='pokemon-${pokemon.id}'><h2>${pokemon.name}</h2>
    <img src="${pokemon.sprite}"/></div>`
  document.getElementById('pokemon-container').appendChild(pokemonCard)
}
function fetchAllPokemon(){
  fetch(`http://localhost:3000/pokemon/`)
  .then((response) => response.json())
  .then((jsonData) => {jsonData.forEach((pokemon) => render(pokemon))})
}
```

### POST Fetch (and dynamically updating the page)
* Will need a form most likely
* Explain difference between `GET fetch` and `POST fetch`
```
fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  },
  body: JSON.stringify({   })
  .then(response => response.json())
  .then(pokemon => {render(pokemon)})
})
```
* Body data needs to be a string

### Optimistic Rendering vs Promise Callback
* You can manipulate the DOM synchronously (outside the `.then()`)
 * This is referred to as optimist rendering because you are not waiting for the async response to resolve
* Or you can manipulate the DOM asynchronously (inside the `.then()`) using the response from the server
 * This is make sure the data on your page is consistent with the database

### PATCH Fetch and or DELETE Fetch
* Explain the difference between POST, PATCH, and DELETE
 * PATCH requires the same headers but body only needs the data to be updated rather than the entire resource object
 * DELETE is like GET but has options object `{method: "DELETE"}`
 ```
  fetch(`http://localhost:3000/pokemon/${id}`, {method: "DELETE"})
  .then((response) => {document.getElementById(`pokemon-${id}`).remove()})
 ```

### Problem Solving Tips
* Some students struggle with knowing what to do or where to start
* A common suggestion is to build out each feature iteratively and think about the features in the context of a user story. For example: “When <some event happens>, I want to make a <what kind of> fetch call and manipulate the DOM <in what way?>”
 * When the page loads, I want to make a GET `fetch` render a list of books
 * When a user clicks the ‘Edit’ button, I want to make a PATCH `fetch` and update this DOM element
 * When a user clicks the ‘New’ button, I want to make a POST `fetch` and render the new dog on the page
 * When a user clicks this ‘Delete’ button, I want to make a DELETE `fetch` and remove this element from the DOM

### Starter Code
 * [Pokedex App](https://github.com/learn-co-curriculum/lectures-starter-code/tree/master/javascript/fetch-and-dom)

### Other Starter Code Options
 * [Monster Challenge](https://github.com/learn-co-curriculum/monsters-practice-challenge)
 * [Pokemon Teams](https://github.com/learn-co-curriculum/pokemon-teams)
 * [Dumbo's Brew App](https://github.com/learn-co-students/dumbo-web-042318/tree/master/23_fetch)
