// 1. check what's already on the page and save it for later
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyForm = document.querySelector('.add-toy-form')
const nameInput = document.querySelector('#name-input')
const imageInput = document.querySelector('#image-input')
const toyListEl =  document.querySelector('#toy-collection')

let addToy = false

// an object to hold all the pieces of data our app might need
const state = {
  toys: []
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// 2. get toys from the server
const getToys = () => {
	return fetch('http://localhost:3000/toys')
		.then(resp => resp.json())
}

// 3. put a single toy on the page
const renderToy = toy => {
  const divEl = document.createElement('div')
	divEl.className = 'card'
	divEl.innerHTML = `
		<h2>${toy.name}</h2>
		<img class='toy-avatar' src='${toy.image}' />
		<p>${toy.likes} Likes</p>
		<button class='like-btn'>LIKE <3</button>
  `
  const likeBtn = divEl.querySelector('.like-btn')
  likeBtn.addEventListener('click', () => {
    increaseLikes(toy.id)
    const toyToChange = state.toys.find(storedToy => storedToy.id === toy.id)
    updateToy(toyToChange)
  })

	toyListEl.appendChild(divEl)
}

// 4. put many toys on the page
const renderToys = toys => {
	toys.forEach(toy => renderToy(toy))
}

// 5. clear the list and populate it again with toys from state
const updateToyList = () => {
  toyListEl.innerHTML = ''
  renderToys(state.toys)
}

// 7. increate a toy's like count
const increaseLikes = (id) => {
	const toy = state.toys.find(toy => toy.id === id)
	toy.likes++
	updateToyList()
}

// 6. get the toys and put them on the page
getToys().then(toyData => {
  state.toys = toyData
  renderToys(toyData)
})

// 8. get the form to add a new toy
newToyForm.addEventListener('submit', event => {
	event.preventDefault()

  // we create object with the toy data we need
	const toy = {
		name: nameInput.value,
		image: imageInput.value,
		likes: 0
  }

  // this resets all the form fields
  newToyForm.reset()

  // create a toy on the server
  createToy(toy)
    .then(toy => {
      // add the toy that came back from the server to the state
      // we need this because the toy from the server has an ID
      state.toys.push(toy)
      renderToy(toy)
    })
})

/* server stuff */
// we could move this to another file to keep things cleaner

// 9. create a toy on the server
const createToy = toy => {
  return fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
  }).then(resp => resp.json())
}

// 10. update toy on server
const updateToy = toy => {
	return fetch(`http://localhost:3000/toys/${toy.id}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(toy)
	})
}
