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
const apollo_server_1 = require("apollo-server");
const mongoose_1 = __importDefault(require("mongoose"));
const schema_1 = __importDefault(require("./schema/schema"));
const index_1 = __importDefault(require("./graphql/resolvers/index"));
const MONGODB_URI = process.env.MONGODB_URI;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!MONGODB_URI) {
            throw new Error("MONGODB_URI environment variable is not defined.");
        }
        yield mongoose_1.default.connect(MONGODB_URI);
        console.log("✅ Connected to MongoDB");
        const server = new apollo_server_1.ApolloServer({
            typeDefs: schema_1.default,
            resolvers: index_1.default,
        });
        const PORT = process.env.PORT || 4000;
        server.listen(PORT).then(({ url }) => {
            console.log(`🚀 Server ready at ${url}`);
        });
    });
}
startServer().catch((err) => console.error(err));
