# Redux Warmup Challenge

Fork and clone this repository and run the app. You've been given a codebase with a bunch of functionality already implemented. Your task is as follows:

* Familiarize yourself with the codebase. Follow through the hierarchy of components, follow through the way actions get dispatched in response to events to modify the state. Add console logs, understand the Redux flow.

* There may be things that are new to you. For example, some components use a [shorthand syntax](https://gist.github.com/alexgriff/0e247dee73e9125177d9c04cec159cc6#mapdispatchtoprops) for the `mapDispatchToProps` function. For other new things, such as `combineReducers` and a `configureStore` file, there are detailed notes left in the codebase to help guide you. Do your best to follow what is going on. Consult the [Redux Terminology Guide](https://gist.github.com/alexgriff/0e247dee73e9125177d9c04cec159cc6) for help.

* Following the patterns shown, **implement three new features**
  - The delete button currently doesn't do anything. Make it work. Remove the painting from the array of all paintings. 
  - When the app initially loads, no active painting is selected. There is already an action `FETCH_PAINTINGS`, that flows though the reducers when the painting data is loaded. *Note that all actions flow through all of the reducers*. Can you set the activePaintingId to the id of the first painting in the array when the app loads. You shouldn't need an additional action creator or action to do this.
  - The `MuseumPicker` component currently doesn't do anything. It should change the state so that it filters only the paintings that are in the "National Gallery of Art, Washington D.C."
