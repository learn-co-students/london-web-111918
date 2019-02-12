# Building a backend with node and express.js

In this lecture we're looking how we can use express.js to serve our `create-react-app` in production and how we can build our custom express routes and middlewares.

- init a new `crate-react-app` or use an existing one and cd into the project directory.

## Adding Express

Install Express `yarn add express`

Bootstrap basic express app in `/server/index.js`

```
const express = require("express");

const app = express();

app.get("/", function(req, res) {
  res.send("Hi from express on node!");
});

const port = process.env.API_PORT || 3004;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
```

Then, run `node server/index.js` in your terminal, check out http://localhost:3004 you should see "Hi from express on node!"

## Create your own middleware:

Route handlers and middlewares always follow the same pattern.
app.[method]([route], [handler])

[method] could be `use` (for universal middlewares),
or `get`/`post`/`patch`/`all`/... for specific HTTP request types

[route] is a string, if it's left out, the middleware will be applied to ALL routes.

[handler] is a middleware function in the form `function(req, res, next) {}`
if the handler doesn't trigger a response,
e.g. with `res.send('Hello World')` or with `res.json({})`
then make sure you call `next()` otherwise the app will hang in the function and the request will eventially time out.

```
// create your own middleware
app.use(function(req, res, next) {
  console.log(
    `${req.method} ${req.originalUrl} - ${req.user ? req.user.email : "guest"}`
  );
  // don't forget to call next when you're done.
  next();
});
```

Restart the server with `node server/index.js` in your terminal, check out http://localhost:3004 you should see the requests getting logged in the terminal.

_Remember_

- Node is just Javascript run on the backend.
- Express is a very approachable server framework based on middlewares that we chain together.

## Dev Setup

Make it easier to dev, with nodemon, the server automatically restarts every time you save a file

- `yarn add nodemon -D` (-D is to save it to the development depencendies)
- package.json scripts, add: `"dev:api" : "./node_modules/.bin/nodemon server/index.js"`

## Serve the React bundle

CRA comes with a command to "bundle" our app. Which will compile, combine and minimize all the code, so it's as small as possible. `npm start` as it's given to us by CRA isn't fit for production. Here's how to upgrade our app to be ready to run on a production server.

To add static file serving for bundled react application (only in production) in your server/index.js at the top of the file, import the path helper tool. `const path = require('path');`

Then add a route handler (after other middlewares)

```
// only if were in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "build")));

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}
```

Now note, if you run `yarn run dev:api` or `node server/index.js` these routes won't get included. That's the NODE_ENV if statement.

However, we can set that environment variable before we call the script:
`NODE_ENV=production node server/index.js`

Note how this now enables these routes.

We're ready to deploy this to a production server now. (In the next lecture).

### Modular routes / Using express.Router.

`express.Router` creates a custom middleware, that acts justlike
the app instance of express that we used above.
With express.Router we can separate different parts of our routes in different files and organise our app in more modular ways.

Let's create a custom router for our API:

In `server/api/routes.js`

```
const express = require("express");

const router = express.Router();

router.get("/", function(req, res) {
  res.send("API response");
});

module.exports = router;
```

And then in `server/index.js`

```
// load API routes from separate file
app.use("/api", apiRoutes);
```

## Further Resources:

[NodeJS](https://nodejs.org/en/)
[Express Docs](https://expressjs.com/en/4x/api.html)
[Great Intro to Express by Mozilla](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
