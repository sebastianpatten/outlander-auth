const graph = require("fbgraph");

const buildUrl = facebookUserId =>
  `/${facebookUserId}?fields=id,name,email,picture.height(200)`;

exports.getUserDetails = async (facebookToken, facebookUserId) =>
  new Promise((resolve, reject) => {
    graph.setAccessToken(facebookToken);
    graph.get(buildUrl(facebookUserId), (error, response) => {
      if (error) reject(new Error(error.message));
      resolve(response);
    });
  });
