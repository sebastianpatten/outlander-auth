 module.exports = {
    port: process.env.PORT || 5001,
    facebookClientId: process.env.facebookClientId || 0000000000,
    facebookClientSecret: process.env.facebookClientSecret || "",
    privateTokenForJWT: "",
    graphqlUrl: process.env.graphqlUrl || '',
};