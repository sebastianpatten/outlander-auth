const config = require("../config");
const getClient = require("../apollo-client-factory");
const { getFacebookToken } = require("./facebook-token-utils");
const getUser = require("./get-outlander-user");
const {
  createAnonymousJwtToken,
  createGuestJwtToken,
  createAdminJwtToken
} = require("../factory/create-jwt-token-factory");
const { getUserDetails } = require("./facebook-user-data");
const createUser = require("./create-outlander-user");

// If the user has sent us a facebook token we try to upgrade
// their session so they get logged in as a privileged guest
module.exports = exportcreateAuthToken = async facebookAuthToken => {
  const anonymousJwtToken = createAnonymousJwtToken();
  if (!facebookAuthToken) return anonymousJwtToken;

  const facebookToken = await getFacebookToken(
    config.facebookClientId,
    config.facebookClientSecret,
    facebookAuthToken
  );

  if (!facebookToken.is_valid) {
    throw new Error("Provided Facebook Auth token was not valid.");
  }

  const facebookUserId = facebookToken.user_id;
  const httpClient = getClient(anonymousJwtToken);
  let outlanderUser = await getUser(httpClient, facebookUserId);

  if (outlanderUser === null) {
    const userDetails = await getUserDetails(facebookAuthToken, facebookUserId);
    const { email, id, name } = userDetails;
    const pictureUrl = userDetails.picture.data.url;
    outlanderUser = await createUser(httpClient, id, name, email, pictureUrl);
  }

  const userIdString = outlanderUser.id.toString();

  return outlanderUser.admin
    ? createAdminJwtToken(userIdString)
    : createGuestJwtToken(userIdString);
};
