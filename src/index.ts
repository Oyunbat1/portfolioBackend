import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "../src/schema/schema";
import  resolvers from "../src/graphql/resolvers/index";


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
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server is ready at http://localhost:${PORT}${server.graphqlPath}`);
  });
}

startServer().catch((err) => console.error(err));
