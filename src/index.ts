import "dotenv/config";
import { ApolloServer } from "apollo-server";
import mongoose from "mongoose";
import typeDefs from "./schema/schema";
import resolvers from "./graphql/resolvers/index";

const MONGODB_URI = process.env.MONGODB_URI;
const FRONTEND_URL = process.env.FRONTEND_URL || "*"; 
async function startServer() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }

  await mongoose.connect(MONGODB_URI);
  console.log("✅ Connected to MongoDB");

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const PORT = process.env.PORT || 4000;
server.listen({
  port: PORT,
  path: '/graphql',
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
}).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

}

startServer().catch((err) => console.error(err));
