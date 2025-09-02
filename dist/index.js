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
const schema_1 = __importDefault(require("../src/schema/schema"));
const index_1 = __importDefault(require("../src/graphql/resolvers/index"));
const MONGODB_URI = process.env.MONGODB_URI;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined.");
        }
        yield mongoose_1.default.connect(MONGODB_URI);
        console.log("connect to mongodb");
        const server = new apollo_server_express_1.ApolloServer({
            typeDefs: schema_1.default,
            resolvers: index_1.default,
        });
        yield server.start();
        const app = (0, express_1.default)();
        server.applyMiddleware({ app });
        const PORT = process.env.PORT || 4000;
        app.listen(PORT, () => {
            console.log(`Server is ready at http://localhost:${PORT}${server.graphqlPath}`);
        });
    });
}
startServer().catch((err) => console.error(err));
