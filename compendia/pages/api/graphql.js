import { ApolloServer, gql } from "apollo-server-micro";
import { mergeResolvers, mergeTypeDefs } from "graphql-tools";
import { comicsResolvers } from "../../api/comics/resolvers";
import { comicsMutations } from "../../api/comics/mutations";
import connectDb from "../../lib/mongoose";
import comics from "../../api/comics/Comics.graphql";

const resolvers = mergeResolvers([comicsResolvers, comicsMutations]);
const typeDefs = mergeTypeDefs([comics]);

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = {
    api: {
        bodyParser: false,
    },
};

const server = apolloServer.createHandler({ path: "/api/graphql" });
export default connectDb(server);
