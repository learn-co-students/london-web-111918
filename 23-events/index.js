const formEl = document.querySelector('#new-task-form')
const inputEl = document.querySelector('[name="new-task-desc"]')
const listEl = document.querySelector('#task-list')
const clearAllEl = document.querySelector('#clear-all-tasks')

function handleFormSubmit(event){
  event.preventDefault()
  const newTaskText = inputEl.value
  // ((save the data (array)))
  // create new li
  const newTaskEl = document.createElement('li')
  // inject newTaskText into innerHTML - of li
  newTaskEl.innerHTML = `
  <label for='${newTaskText}'>
    <input type='checkbox' name='${newTaskText}'/> ${newTaskText}
  </label>
  `

  const checkboxEl = newTaskEl.querySelector('input[type=checkbox]')

  checkboxEl.addEventListener('change', (e) => {
    if(checkboxEl.checked) {
      // add class done
      newTaskEl.classList.add('done')
    } else {
      // remove class done
      newTaskEl.classList.remove('done')
    }
  })


  // double click list item to delete task
  newTaskEl.addEventListener('dblclick', (event) => {
    // console.log(event.target)
    // if(event.target.tagName =='li'){
    //   event.target.remove()
    // } else {
    //   if(event.target.parentElement.tagName === 'li'){
    //
    //   }
    // }
    const confirmRemove = confirm('Do you want to delete this task? Press "OK" to delete.')
    if(confirmRemove === true) {
      newTaskEl.remove()
    }
  })


  newTaskEl.className = 'card task-item'
  // append to
  listEl.appendChild(newTaskEl)
  formEl.reset()
}
formEl.addEventListener('submit', handleFormSubmit)



clearAllEl.addEventListener('click', (e) => {
  const confirmRemove = confirm('Do you want to delete ALL tasks? Press "OK" to delete.')
  if(confirmRemove === true) {
    listEl.innerHTML = ''
  }
})
