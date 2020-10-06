import { ApolloServer } from "apollo-server-micro";
import { mergeResolvers, mergeTypeDefs } from "graphql-tools";
import connectDb from "../../lib/mongoose";

// Mutations and resolvers
import { comicsResolvers } from "../../api/comics/resolvers";
import { comicsMutations } from "../../api/comics/mutations";
import { seriesResolvers } from "../../api/series/resolvers";
import { seriesMutations } from "../../api/series/mutations";
import { publishersResolvers } from "../../api/publishers/resolvers";
import { publishersMutations } from "../../api/publishers/mutations";

// GraphQL Schema
import Comics from "../../api/comics/Comics.graphql";
import Series from "../../api/series/Series.graphql";
import Publishers from "../../api/publishers/Publishers.graphql";

// Merge type resolvers, mutations, and type definitions
const resolvers = mergeResolvers([
    comicsResolvers,
    comicsMutations,
    seriesResolvers,
    seriesMutations,
    publishersResolvers,
    publishersMutations,
]);
const typeDefs = mergeTypeDefs([Comics, Series, Publishers]);

// Create apollo server and connect db
const apolloServer = new ApolloServer({ typeDefs, resolvers });
export const config = {
    api: {
        bodyParser: false,
    },
};
const server = apolloServer.createHandler({ path: "/api/graphql" });
export default connectDb(server);
