const jwt = require("jsonwebtoken");
const config = require("../config");

const anonymous = "anonymous";
const guest = "guest";
const outlanderAdmin = "outlanderAdmin";

const createJwtToken = body => jwt.sign(body, config.privateTokenForJWT);

exports.createAnonymousJwtToken = () =>
  createJwtToken({
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": [anonymous],
      "x-hasura-default-role": anonymous
    }
  });

exports.createGuestJwtToken = userId =>
  createJwtToken({
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": [guest],
      "x-hasura-default-role": guest,
      "x-hasura-user-id": userId
    }
  });

exports.createAdminJwtToken = userId =>
  createJwtToken({
    "https://hasura.io/jwt/claims": {
      "x-hasura-allowed-roles": [outlanderAdmin],
      "x-hasura-default-role": outlanderAdmin,
      "x-hasura-user-id": userId
    }
  });
