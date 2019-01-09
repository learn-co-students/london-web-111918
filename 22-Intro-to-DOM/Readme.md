# Intro To The DOM JS

## Resources
* [The DOM](https://www.youtube.com/watch?v=oVp-CKK25NM)

### The Document Object Model
* What is the DOM?
  * Object-oriented representation of the webpage which allows programs to manipulate the properties and contents on the page
  * When HTML is compiled, the DOM is created based on that HTML
  * Javascript is a language created to manipulate the DOM

* Brief tour of Developer Tools
  * Open the Dev Tools by right-clicking on the page and selecting 'View Page Source' from the context menu
  * View DOM in the 'Elements' tab
    * HTML is directly editable in the main panel
    * Use 'Styles' tab to view and manipulate CSS
    * Use pointer feature to find elements by hovering over the DOM
  * JS Console
    * If they haven't seen it already, show them how the console works

### CSS Selectors
* Individual selectors
  * Class `.class`
  * ID `#id`
  * Tag `div`
* Combining Selectors
  * Space between `#parent .child`
  * Chain `div.image.highlighted`

### Selecting DOM Nodes
* Understand types that are returned form selecting a DOM node with JavaScript
* Understand how to use CSS selectors
* Methods

  ```js
  node.querySelector('#unique-element')
  node.querySelectorAll('.some-shared-class')
  node.getElementsByTagName('body')[0]
  node.getElementById('unique-element')
  node.getElementsByClassName('some-shared-class')
  ```
  * `NodeList` is array-like, but depending on the browser you're using, it does not have iterators built on it. They be borrowed from `Array.prototype`

  Read more about this here:
  https://developer.mozilla.org/en-US/docs/Web/API/NodeList#Example

  * Chain CSS selectors to get greater specificity

  ```
  // Say we want to select a div like <div id="news-item-1" class="news-item is-hero with-shadow"></div>

  // Selects the first div on the page, returns one Element
  const myDiv = document.querySelector('div')

  // Selects all divs on the page, returns NodeList
  const myDiv = document.querySelectorAll('div')

  // selects first div with an id of news-item-1
  const myDiv = document.querySelector('div#news-item-1')

  // selects first div with classes `news-item` AND `hero`
  const myDiv = document.querySelector('div.news-item.hero')
  ```

  Nice little game to get your head around CSS selectors:
  https://flukeout.github.io/


### Modifying DOM Nodes
* Storing node in a variable `let body = document.querySelector('body')`
* Changing attributes `body.style.backgroundColor = red`
* `innerText` and `textContent` vs. `innerHTML`
* Removing elements `document.removeChild(body)`

### Creating DOM Objects
* Instantiating new elements `let element = document.createElement('img')`
* Adding attributes to elements `element.src = 'http://www.coooolimage.com'`
* Appending to node `document.body.appendChild(element)`
