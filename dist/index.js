"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = __importDefault(require("./schema/schema"));
const index_1 = require("./graphql/index");
const cors_1 = __importDefault(require("cors"));
const MONGODB_URI = process.env.MONGODB_URI;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined.");
        }
        try {
            yield mongoose_1.default.connect(MONGODB_URI);
            console.log("Connected to MongoDB");
        }
        catch (error) {
            console.error("MongoDB connection error:", error);
        }
        const app = (0, express_1.default)();
        // CORS configuration
        app.use((0, cors_1.default)({
            origin: process.env.FRONTEND_URL || "http://localhost:3000",
            credentials: true
        }));
        // Body parser middleware
        app.use(express_1.default.json());
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.default,
            resolvers: index_1.resolvers,
            context: ({ req }) => ({ req }),
            introspection: true, // Enable GraphQL Playground in production
        });
        yield server.start();
        server.applyMiddleware({ app, path: '/graphql' });
        // Health check endpoint
        app.get('/health', (req, res) => {
            res.json({ status: 'OK', timestamp: new Date().toISOString() });
        });
        // Root endpoint
        app.get('/', (req, res) => {
            res.json({
                message: 'GraphQL API Server',
                endpoint: '/graphql',
                playground: '/graphql'
            });
        });
        const PORT = process.env.PORT || 4000;
        if (process.env.NODE_ENV !== 'production') {
            // Only start server in development
            app.listen(PORT, () => {
                console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
            });
        }
        return app;
    });
}
// For Vercel serverless functions
const app = startServer();
exports.default = app;
