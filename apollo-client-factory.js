const fetch = require("node-fetch");
const { createHttpLink } = require("apollo-link-http");
const { InMemoryCache } = require("apollo-cache-inmemory");
const { ApolloClient } = require("apollo-client");
const { ApolloLink } = require("apollo-link");
const config = require("./config");

module.exports = token => {
  const authLink = new ApolloLink((operation, forward) => {
    // Use the setContext method to set the HTTP headers.
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });

    // Call the next link in the middleware chain.
    return forward(operation);
  });

  return new ApolloClient({
    link: authLink.concat(createHttpLink({
      uri: config.graphqlUrl,
      fetch: fetch
    })),
    cache: new InMemoryCache()
  });
};
