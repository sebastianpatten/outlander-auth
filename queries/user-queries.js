const { gql } = require("apollo-boost");

// Read queries
exports.getUserByFacebookId = gql`
  query User($facebookId: String!) {
    User(where: { facebookId: { _eq: $facebookId } }) {
      id
      admin
    }
  }
`;

// Write queries
exports.addUser = gql`
  mutation insert_User(
    $facebookId: String!
    $name: String!
    $email: String
    $photoUrl: String!
  ) {
    insert_User(
      objects: {
        facebookId: $facebookId
        name: $name
        email: $email
        photoUrl: $photoUrl
      }
    ) {
      returning {
        id
      }
    }
  }
`;
