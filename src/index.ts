import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import typeDefs from "./schema/schema";
import { resolvers } from "./graphql/index";
import cors from "cors";

const MONGODB_URI = process.env.MONGODB_URI;

async function startServer() {
  if (!MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is not defined.");
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }

  const app = express();
  app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true
  }));

  app.use(express.json());

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
    introspection: true, 
  });

  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  });

  app.get('/', (req, res) => {
    res.json({ 
      message: 'GraphQL API Server', 
      endpoint: '/graphql',
      playground: '/graphql'
    });
  });

  const PORT = process.env.PORT || 4000;
  
  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
      console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    });
  }

  return app;
}

const app = startServer();

export default app;
