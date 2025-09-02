import "dotenv/config";
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./schema/schema";
import {resolvers} from "./graphql";
const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }
  await mongoose.connect(MONGODB_URI);
  console.log("connect to mongodb");
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  const { url } = await server.listen();
  console.log("server is ready at " + url);
}

startServer().catch((err) => console.error(err));
