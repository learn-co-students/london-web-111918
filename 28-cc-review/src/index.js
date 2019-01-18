let imageId = 1873 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

const imgEl = document.querySelector('#image')
const titleEl = document.querySelector('#name')
const likesEl = document.querySelector('#likes')
const likeBtn = document.querySelector('#like_button')
const commentForm = document.querySelector('#comment_form')
const commentInput = document.querySelector('#comment_input')
const commentList = document.querySelector('#comments')

const state = {
  image: null
}

const init = () => {  
  likeBtn.addEventListener('click', increaseLikes)

  commentForm.addEventListener('submit', event => {
    event.preventDefault()
    addComment()
  })

  getImage()
    .then(imageData => {
      state.image = imageData
      renderImage()
    })
}

const renderImage = () => {
  const img = state.image
  imgEl.src = img.url
  titleEl.innerText = img.name
  likesEl.innerText = img.like_count

  const commentsHTML = state.image.comments.map(
	  comment => `<li>${comment.content}</li>`
  ).join('')
  commentList.innerHTML = commentsHTML
}

const increaseLikes = () => {
	state.image.like_count++
  renderImage()
  increaseLikesOnServer()
}

const addComment = () => {
	const content = commentInput.value
  commentForm.reset()
  createCommentOnServer(content)
    .then(comment => {
      state.image.comments.push(comment)
      renderImage()
    }) 
}

// server stuff
const getImage = () =>
	fetch(imageURL)
		.then(resp => resp.json())

const increaseLikesOnServer = () =>
  fetch(likeURL, {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        image_id: imageId
    })
  }).then(resp => resp.json())

const createCommentOnServer = content =>
	fetch(commentsURL, {
		method: 'POST',
		headers: {
  			'Accept': 'application/json',
  			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
  			image_id: imageId,
  			content: content
		})
	}).then(resp => resp.json())

init()
