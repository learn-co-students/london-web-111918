# Intro to JSX

### JS so far

* lack of structure
* unnecessarily complex syntax at times
* messing up styling by accident
* debugging
* .then (promises)
* event handlers
* working with elements
* element asynchronicity
* too imperative

### Brief History/Context

React is made by Facebook. I like to point out that if anyone's ever heard about the licensing thing (i.e. you can't build an app that competes with FB in React) that's no longer true and React uses the MIT open source license. There are two libraries `react`, `react-dom`, this is to divide up the functionality and enables `react-native`, `react-vr`, etc.

### Project Set Up

In index.js
`ReactDOM.render` take two args:

```js
ReactDOM.render(whatToAddToDOM, whereToPutIt);
```

Demonstrate that the second arg is the **only place we will be using code from mod 3 such as `document.getElementById('main')`**. This is also why we won't be bringing in jQuery. It'd be overkill to import a huge library to run one line of code `$('#main')`

whatToAddToDOM: we need to add a React Element! First thing I'd do is to write like:

```js
ReactDOM.render(React.createElement('h1'), document.getElementById('main'));
```

And inspect the HTML, an h1 will be there, but we won't see any text. Change it to:

```js
ReactDOM.render(
  React.createElement('h1', {}, 'hello'),
  document.getElementById('main')
);
```

And we'll see it on the page!

### Briefly on Virtual DOM

Put a debugger and look what `React.createElement` returns. Ask what that looks like: an object-- that's it! That's what the Virtual DOM is, a plain JS object that builds up a picture of what the real DOM should look like. Reminder: html is just a string, the DOM is a _representation_ of that string we can interact with programmatically, ask questions to, etc. Virtual DOM is a representation of that representation. React will be in charge of making sure the real DOM looks like and will always be in sync with the virtual DOM. Declarative vs. Imperative.

### myCreateElement

If `React.createElement` just returns an object we should be able to write this on our own. Here's the bare minimum needed. (Refs we wont talk about today, symbols they maybe haven't seen (but they're basically just like Ruby symbols), and we'll talk more about props soon)

```js
const myCreateElement = (type, props = {}, children) => {
  return {
    $$typeof: Symbol.for('react.element'),
    type: type,
    props: { children: children },
    ref: null
  };
};
```

Use your function instead of React's. Cool!

Now present the problem of wanting to create an "Article", i.e. some type of title in an h1, followed by the text in a p tag. How can we do this?

Someone should know that you'll have to wrap the whole thing in another element such as a div. Point out that this isn't like a React thing its just a programming thing. CreateElement is a function that returns an object. You can't return 2 things from a function. Talk through children being an array (not nested nodes, but siblings)

```js
ReactDOM.render(
  myCreateElement('div', {}, [
    myCreateElement('h1', {}, 'My Title'),
    myCreateElement('p', {}, 'some text of article')
  ]),
  document.getElementById('main')
);
```

Refactor to a function:

```js
const Article = props => {
  return myCreateElement('div', {}, [
    myCreateElement('h1', {}, props.title),
    myCreateElement('p', {}, props.text)
  ]);
};

ReactDOM.render(
  Article({ title: 'Title', text: 'some text' }),
  document.getElementById('main')
);
```

What if you wanted to add a CSS class. Why can't we use the keyword 'class'. Make sure to change myCreateElement to merge in props. Talk about ES2015 all the time.

```js
const myCreateElement = (type, props = {}, children) => {
  return {
    $$typeof: Symbol.for('react.element'),
    type: type,
    props: { ...props, children: children },
    ref: null
  };
};

const Article = props => {
  // show how we'll see this in the HTML
  // virtual dom = picture of what html should look like
  return myCreateElement('div', { className: 'article' }, [
    myCreateElement('h1', { className: 'header' }, props.title),
    myCreateElement('p', { className: 'body' }, props.text)
  ]);
};
```

### Navbar Student Exercise

```js
// <div class="ui inverted orange menu">
//     <a class='item'>
//       <h2 class="ui header">
//         <i class="paw icon"></i>
//         <div class="content">
//           ZooKeepr
//         </div>
//         <div class="sub header">
//           Keep track of your animals
//         </div>
//       </h2>
//     </a>
//   </div>
```

Student Task: write a function called Navbar I would expect to be used like this:

```js
const Navbar = props => {
  // ...
};

ReactDOM.render(
  Navbar({
    title: 'ZooKeepr',
    icon: 'paw',
    color: 'green',
    description: 'keep track of your animals'
  }),
  document.getElementById('main')
);
```

### JSX

Ok cool, but if this was how we had to write React it would not be the popular framework it is.

Here's the same code example, using JSX:

```jsx
const NavBar = props =>
  <div className={`ui inverted ${props.color} menu`}>
    <a className='item'>
      <h2 className="ui header">
        <i className={`${props.icon} icon`}></i>
        <div className="content">
          {props.title}
        </div>
        <div className="sub header">
          {props.subtitle.toUpperCase()}
        </div>
        {
          props.names.map((name, idx) => <li key={idx}>{name}</li>)
        }
      </h2>
    </a>
  </div>
```

Compare `{}` in JSX to ERB. They mean "evaluate this as JavaScript". `<h1>props.title</h1>` vs. `<h1>{props.title}</h1>`
