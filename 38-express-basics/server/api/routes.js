const express = require("express");

const router = express.Router();

// add route handlers to router, just as you would to to app in our server/index.js
router.get("/users", function(req, res) {
  // get someuser info outof the database...

  res.json([
    {
      name: "jonas",
      email: "hello@jonashaefele.com"
    }
  ]);
});

router.post("/users", function(req, res) {
  // do something saving the user info to the database...

  // this sends the request body back to the frontend
  // bit useless, but this shows you how to access the request.
  res.json(req.body);
});

// ES5 module syntax
// this is equal to export default router in ES6
// This exports the router middleware so we can use it in server/index.js
module.exports = router;
