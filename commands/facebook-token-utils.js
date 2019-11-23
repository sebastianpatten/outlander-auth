const api = require("../api");
const { buildAppTokenUrl, buildValidateUrl } = require("../url-factory");

// This validates that a facebook auth token is still valid
exports.getFacebookToken = async (facebookClientId, facebookClientSecret, facebookUserAuthToken) => {
  const appAccessTokenUrl = buildAppTokenUrl(facebookClientId, facebookClientSecret);
  const appAccessTokenResult = await api.get(appAccessTokenUrl);
  if (appAccessTokenResult.status !== 200)
    throw "Error occured trying to get access token";
  const appAccessToken = appAccessTokenResult.data.access_token;
  if (!appAccessToken)
    throw "Could not get app access token as it was not in the response from Facebook.";
  const validateUrl = buildValidateUrl(facebookUserAuthToken, appAccessToken);
  const validateResult = await api.get(validateUrl);
  if (validateResult.status !== 200)
    throw "Error occured trying to validate user token from Facebook.";
  return validateResult.data.data;
};
