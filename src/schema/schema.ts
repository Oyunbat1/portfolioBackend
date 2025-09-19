import { gql } from "apollo-server";

const typeDefs = gql`
  type Message {
    id: ID!
    name: String!
    social: String!
    email: String!
    company: String!
    service: String!
    message: String!
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    getMessages: [Message!]!
  }
    type Mutation {
    createMessage(
      name: String!
      email: String!
      social: String!
      company: String!
      service: String!
      message: String!
    ): Message!
  }
`;
export default typeDefs;