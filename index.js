const express = require("express");
const asyncHandler = require("express-async-handler");
const createAuthToken = require("./commands/create-auth-token");
const config = require("./config");

var app = express();
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post(
  "/api/v1/create-auth-token",
  asyncHandler(async (req, res, next) => {
    const { facebookAuthToken } = req.body;
    
    try {
      const token = await createAuthToken(facebookAuthToken);
      res.status(200).send(token);
    } catch (exception) {
      res
        .status(404)
        .send(
          "User could not be found by facebook id. Make sure this user exists and has their facebookId set."
        );
    }
  })
);

app.listen(config.port);
