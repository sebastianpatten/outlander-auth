const { addUser } = require("../queries/user-queries");

module.exports = async (client, facebookId, name, email, photoUrl) =>
  new Promise((resolve, reject) => {
    client
      .mutate({
        mutation: addUser,
        variables: {
          facebookId,
          name,
          email,
          photoUrl
        }
      })
      .then(result => {
        resolve(result.data.insert_User.returning[0]);
      })
      .catch(error => reject(error));
  });
