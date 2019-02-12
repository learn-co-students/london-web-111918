const express = require("express");
const path = require("path");

const apiRoutes = require("./api/routes");
const app = express();

// parse JSON requests
app.use(express.json());

/* Create your own middleware
-----------------------------
Route handlers and middlewares always follow the same pattern.
app.[method]([route], [handler])

[method] could be `use` (for universal middlewares),
or get/post/patch/all for specific HTTP request types

[route] is a string, if it's left out, the middleware will be applied to ALL routes.

[handler] is a middleware function in the form  function(req, res, next) {}
if the handler doesn't trigger a response,
e.g. with  `res.send('Hello World')` or with res.json({})
then make sure you call `next()` otherwise the app will hang in the function and the request will eventially time out.

*/

app.use(function(req, res, next) {
  console.log(
    `${req.method} ${req.originalUrl} - ${req.user ? req.user.email : "guest"}`
  );
  // don't forget to call next when you're done.
  next();
});

// load API routes from separate file
app.use("/api", apiRoutes);

// in production, serve the react bundle statically.
// more info at: https://facebook.github.io/create-react-app/docs/deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "build")));
  // if the user requests the root of the domain '/' send the index.html that load the react app.
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "..", "build", "index.html"));
  });
}

// get PORT from env variables.
// API_PORT for development, in case we need to overwrite both API and CRA ports
// PORT as second priority (heroku), then fall back to default 3004
const port = process.env.API_PORT || process.env.PORT || 3004;
app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
