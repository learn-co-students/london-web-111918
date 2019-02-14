# Introduction to Redux

### Problems of React

- State is ever-changing and is constantly being mutated in React.
- Large React apps require props to be passed needlessly throughout the component tree.
- React apps with tons of stateful components are constantly rerendering.

### The Solution: Redux

- What Is Redux?

  - The goal of Redux is to make state **global** and make all state changes **predictable**
  - Redux at its core is a state manager built for React.js
  - The main concept behind Redux is to store state in a central location and allow each component to access that state without having to send props down to child components or use callback functions to send data back up to the parent

- Why Redux?
  - As your React applications become increasingly more complex, State becomes increasingly harder to manage
  - An app with 20+ stateful components in its structure ignores the single source of truth principle and changes in state are difficult to track
  - Redux alleviates these issues by placing state in a single, central location that all of your components can interact with

### Single Source of Truth

- We use the Redux store to contain a singular and universal state within our application.
- Redux Store
  - The Redux store is a plain JS object that exposes a few Redux specific methods like `dispatch` and `getState`. Our applications state lives here
  - The store is created at the very beginning of an application with the `createStore` function

### Reading and Writing to the Store

- With Redux, the state of our application will actually never _change_. Instead, the `store` is alerted of changes and returns a new state based off of the previous state and incoming alterations.
- The state can be accessed by the method `getState`, a reader method
- The state can be manipulated by sending an "action" to a method called `dispatch`
  - An action is a plain object containing the instructions and information that describes the state changes we expect to see
  - Actions typically have two keys:
    - `type`: a string used to identify the type of state change
    - `payload`: any data needed to complete the state change

### Pure Functions: Reducers

- When we get an action telling us how the state should change, we use pure functions called reducers that do not mutate state but instead return an entirely new state to replace the old one
- Reducers
  - A reducer function's job is to read an action and return newly updated state
  - When a Redux store is created via `createStore`, the reducer is given as its first argument
  - A reducer function receives two arguments: the current state and an `action` object
  - The return value of the reducer function will become the new state
  - An easy way to remember the role of a reducer is that it takes two arguments and _reduces_ them to one thing, the new state

### Unidirectional Flow

- Manipulating the Redux store can be broken down to a series of unidirectional steps

  1. Component triggers an action
  2. Action sent to reducer
  3. Reducer returns the new state
  4. Change in store causes rerender in components that rely on the piece of state that changed

### Common Hurdles of Redux

- Global State:
  - Previously, state existed in multiple locations and students were comfortable constructing stateful components. At first, it may seem odd to relocate every piece of their state to one place, but give it a shot, it'll make your lives easier in the long run.
- Reducers:
  - The main role of a reducer is to interpret dispatched messages and tell the store to return a new version state.

## Introducing Redux - The Plumbing

Installing redux: `yarn add redux`

Creating our redux store:

```js
import { createStore } from "redux";
const reducer = (oldState, action) => {
  if (oldState === undefined) {
    return {};
  }
  return oldState;
};

const store = createStore(reducer);
```

## Designing our state

- Starting to think in Redux
- 'Shape' of our state: keys in our store and the _types_ of the values
- e.g. "`count` will be a number. `friends` will be an array of Friend objects. `loading` will be a boolean.

> Note: This is just like step 3 of Thinking in React. We _just_ need to figure out the shape of the state, not where it lives.

- What should the initial state be?
- Redux init action - `"@@redux/INITxyz"`
- Warning on returning `undefined` from our store

### Reading from the store

We want to read the count from the store
We can get the current state with `getState`

```js
// instead of this.props.count
store.getState().count;
```

**We no longer depend on props!**

## Dispatching Actions to our store

- What are the things that can happen in our app?
- These will become the _actions_ that our store responds to

Action: A plain old javascript object (POJO) with the key `type`, a string. Optionally, more data.

```js
{
  type: "CLICKED_PLUS";
}
```

```js
increment = () => {
  store.dispatch({ type: "CLICKED_PLUS" });
};

decrement = () => {
  store.dispatch({ type: "CLICKED_MINUS" });
};
```

Q: Where should these functions live?
A: Wherever you like! They don't depend on `setState`, so they can be defined in the component where they are used.

## Updating State

Let's see the actions flow through our reducer:

```js
const reducer = (oldState = { count: 0 }, action) => {
  console.log("action", action);
  return oldState;
};
```

_Rule: we must not mutate the old state!_

Our reducer should return a _new_ object with the updated state

```js
const reducer = (oldState = { count: 0 }, action) => {
  console.log("action", action);
  if (action.type === "CLICKED_PLUS") {
    return { count: oldState.count + 1 };
  }
  return oldState;
};
```

If we expect to return different states based on different actions, we can use a switch statement:

```js
const reducer = (oldState = { count: 0 }, action) => {
  console.log("action", action);
  switch (action.type) {
    case "CLICKED_PLUS":
      return { count: oldState.count + 1 };
    case "CLICKED_MINUS":
      return { count: oldState.count - 1 };
    default:
      return oldState;
  }
};
```

### Why isn't our view updating?

The redux store is changing! (We can see if we log it)

React only rerenders on props or state change. We need a little hack to make our store updates rerender our app.

```js
componentDidMount() {
  store.subscribe(() => this.forceUpdate())
}
```

## Challenge

Add buttons, actions, and cases to your reducer so that we can increment and decrement by `+3` and `-5`
