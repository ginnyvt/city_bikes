import config from "config";
import http from "http";
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs, resolvers } from "./../graphql";

/* local imports */
import app from "./express";

async function startApolloServer() {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    schema: makeExecutableSchema({
      typeDefs,
      resolvers,
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();
  server.applyMiddleware({ app, path: "/" });

  const port = config.get("port");
  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));

  const environment = config.get("env");
  console.log(
    `🚀 Server ${environment} env is ready at http://localhost:${port}${server.graphqlPath}`
  );
}
export { startApolloServer };
