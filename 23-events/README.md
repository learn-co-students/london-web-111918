# Event Listeners

## Resources

* [JavaScript Events](https://www.youtube.com/watch?v=Wvt6cj87vYQ)


### Introduction to Events

* Why use event listeners?
  * As programmers, we interact with the DOM using JS; typical end-users do not
  * In order for a user to interact with a page, events must be triggered to initiate JS code
  * May be useful to go to a real website with a lot of user interaction and describe the listeners that are on that page
* Add event listeners to the DOM using `addEventListener` on DOM elements
* `addEventListener` is an HOF that takes two arguments: a string designating the event type and a callback
  * Useful to show an event listener callback defined as a normal function, then in-line
* [MDN Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
* [W3Schools Event Reference](https://www.w3schools.com/jsref/dom_obj_event.asp)
* Highlight common event types:
  * `click `
  * `keydown` vs `keyup` vs `keypress`
  * `submit`
  * `DOMContentLoaded`

### Inside an Event Listener Callback

* When an event listener is called, the listener attempts to pass the event object to provided callback, therefore the event object is only available if we declare it as an argument.
* Different events have different properties
  * Mouse events have mouse coordinates
  * Key events have information about pressed key
  * Etc.
* `event.target`
  * Returns the DOM element upon which the event was triggered
  * `event.target.children` gives array of all children of that target
* `this` inside an event listener callback is `undefined`; use `bind` or arrow functions to bind context

### Basic Event Implementation

* Main goal is to show the overall pattern of event listeners
  * User interaction with the DOM leads to a function chain that typically ends in DOM manipulation
    1. Find DOM element that will act as trigger
    2. Add event listener to DOM element
    3. Inside of event listener callback one might:
      * Prepare data
      * `setTimeout` or `setInterval`
      * Change attributes/values of target or other DOM elements
      * Add or remove DOM elements
* Using a static HTML page, add event listeners to HTML elements to change their properties.
* Examples of things to show:
  * Iterate through a list and add event listeners that change their styling properties and/or text on click
  * Add an event listener to a `div` that on `keydown` adds that key to the text of one or more DOM elements.
  * Add a button that starts and stops a timer
  * Make a delete listener that deletes any element on the page `onClick` **this is a great example to preview event delegation**

  ```js
  document.addEventListener("click", (event)=>{
    event.preventDefault()
    event.target.remove()
  })
  ```

### Events and Forms

* In order to obtain user input, we use `input` tags and use their `value` attribute to access their contents
* [Input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
  * text (default)
  * number
  * submit
  * radio/checkbox
  * ...many more
* There are two typical ways to handle a submission: using a form with a `submit ` event or a button with a `click` event
  * Gotchas to using form `submit` event
    * `submit` events can only be triggered by form elements
    * `preventDefault` to prevent the default action of a submit event: a page reload
    * Can grab the relevant inputs using the event object only if theinputs are children of the form; otherwise the inputs must be found manually
  * Gotchas to using `click` event submission
    * Pressing the return key will not submit
    * You will not be able to use the event object to locate the target inputs and instead must be found manually
* Typical flow for a form:
  1. User enters input
  2. An event triggers (form submission or click)
  3. In the event, relevant input elements are found
  4. Values are pulled from input elements
  5. Those values are used for whatever purpose (storing, sent out in a fetch for storage in a database)
  6. Usually ends in some sort of DOM manipulation (creation or edition of elements)


### Event Delegation
* HTML that is nested **and** can execute two different actions
  * An example of this is a `div` -> `ul` -> many `li` structure. The `li` can contain both some text and a button: clicking the text executes one action; clicking the button executes another. This allows us to show two types of delegation: delegation with a dynamic number of elements (i.e. the list) and delegation with different outcomes (i.e. the two actions)

    ```html
    <div>
      <ul>
        <li>
          <text>Meow</text>
          <button>Delete</button>
        </li>
        <li>
          <text>Woof</text>
          <button>Delete</button>
        </li>
        <li>
          <text>Quack</text>
          <button>Delete</button>
        </li>
      </ul>
    </div>
    ```

    ```js
    let textEls = document.querySelectorAll('text')

    textEls.forEach(text => {
      text.addEventListener("click", (event) => alert(event.target.textContent))
    })

    let buttons = document.querySelectorAll('button')

    buttons.forEach(button => {
      button.addEventListener("click", (event) => event.target.parentNode.remove())
    })
    ```
* Without delegation, we would have to add event listeners to every element individually
  * A prebuilt form that `onSubmit` appends another element to the list would be handy. Show them that the event listeners need to be added at the time of the element's creation

    ```html
    //...above mentioned code

    <form>
      <input id="noise-input" type="text" placeholder="Make a noise!" />
      <input type="submit">Submit!</input>
    <form>
    ```
    ```js
    let form = document.querySelector('form')

    form.addEventListener('submit', (event) => {
      event.preventDefault()
      let input = document.querySelector("input#noise-input")
      let ul = document.querySelector("ul")


      let text = document.createElement("text")
      text.textContent = input.value
      text.addEventListener("click", (event) => alert(event.target.textContent))

      let button = document.createElement("button")
      button.textContent = "Delete"
      button.addEventListener("click", (event) => event.target.parentNode.remove())

      let li = document.createElement("li")
      li.append(text)
      li.append(button)

      ul.append(li)

      input.value = ""
    })

    ```
* Aside to bubbling and capturing
  * Events bubble up from children to parents all the way up to the top of document, triggering all event listeners along the way

    ```html
    <div id="container">
      <ul id="list">
        <li id="item">Click Me!</li>
      </ul>
    </div>
    ```

    ```js
    let div = document.getElementById("container")
    let ul = document.getElementById("list")
    let li = document.getElementById("item")

    function logThisAndTarget(event){
      console.log("THIS", this)
      console.log("TARGET", event.target)
    }
    div.addEventListener("click", logThisAndTarget)
    ul.addEventListener("click", logThisAndTarget)
    li.addEventListener("click", logThisAndTarget)
    ```

  * `stopPropagation` can be used to prevent bubbling
* We can use bubbling to our advantage by attaching the listener to a container element and using attributes of the `event` to identify the precise element upon which the event was triggered.
  * Use the event to identify which action to trigger

    ```js
    function listener(event){
      switch (event.target.tagName){
        case "LI":
          console.log("li things")
        case "BUTTON":
          console.log("button things")
        default:
          console.log("everything else")
      }
    }
    ```
  * Use the event to identify which item in a list was clicked using a dynamically generated id
    * Useful to show the use of the `data` attribute on HTML elements as a better alternative

    ```html
    <div id="noise-container">
      <ul>
        <li data-animal="cat">
          <text>Meow</text>
          <button>Delete</button>
        </li>
        <li data-animal="dog">
          <text>Woof</text>
          <button>Delete</button>
        </li>
        <li data-animal="duck">
          <text>Quack</text>
          <button>Delete</button>
        </li>
      </ul>
    </div>
    ```

    ```js
    let noiseContainer = document.querySelector("div#noise-container")

    noiseContainer.addEventListener('click', event => {

    })

    ```
