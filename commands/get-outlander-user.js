const { getUserByFacebookId } = require("../queries/user-queries");

module.exports = async (client, facebookId) =>
  new Promise((resolve, reject) => {
    client
      .query({
        query: getUserByFacebookId,
        variables: {
          facebookId
        }
      })
      .then(result => {
        if (result.data.User.length === 0) {
          resolve(null);
        }

        resolve(result.data.User[0]);
      });
  });
