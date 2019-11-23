exports.buildAppTokenUrl = (clientId, clientSecret) =>
  `https://graph.facebook.com/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`;

exports.buildValidateUrl = (facebookAuthToken, appAccessToken) =>
  `https://graph.facebook.com/debug_token?%20input_token=${facebookAuthToken}&access_token=${appAccessToken}`;