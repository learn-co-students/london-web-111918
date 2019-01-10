// Fetch (GET) pokemons
// parse JSON
// for each pokemon
// - create a element
// - fill it with h1 and image
// - render that pokemon to the page

const API_URL = 'http://localhost:3000/pokemons'

const pokeListEl = document.querySelector('#poke-list')
const pokeFormEl = document.querySelector('#poke-form')
const pokeNameInputEl = document.querySelector('[name="poke-name"]')
const pokeImageInputEl = document.querySelector('[name="poke-image"]')


function getPokemons () {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      // for each pokemon
      // - DONE create a element
      // - DONE fill it with h1 and image
      // - render that pokemon to the page
      data.forEach(renderSinglePokemon)
  })
}

const renderSinglePokemon = (pokemon) => {
  const pokeEl = document.createElement('li')
  pokeEl.className = 'card'
  pokeEl.innerHTML = `
    <img src="${pokemon.image}" />
    <h2>${pokemon.name}</h2>
  `
  // long version using createElement:
  // const imgEl = document.createElement('img')
  // imgEl.src = pokemon.image
  // pokeEl.appendChild(imageEl)

  pokeListEl.appendChild(pokeEl)
}

// Add a new pokemon
/*
 - DONE listen for form submit
 - DONE get the values from the form fields
 - DONE create a new pokemon object
 - render new pokemon to DOM
 - POST pokemon to the API (to persist)
*/

pokeFormEl.addEventListener('submit', handleFormSubmit)


function handleFormSubmit (event) {
  event.preventDefault()

  const newPokemon = {
    name: pokeNameInputEl.value,
    image: pokeImageInputEl.value
  }

  console.log('new pokemon', newPokemon)
  renderSinglePokemon(newPokemon)
  savePokemonToApi(newPokemon)
}

const savePokemonToApi = (pokemon) => {
  fetch(API_URL, {
    method: 'POST',
    headers: {
      "Content-Type":"application/json"
    },
    body: JSON.stringify(pokemon)
  }).then(console.log)
}

getPokemons()
