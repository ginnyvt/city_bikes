import { resolvers as stationResolvers } from "./../domains/station/graphql/";
import { resolvers as journeyResolvers } from "./../domains/journey/graphql/";

const defaultResolver = {
  Query: {
    time: () => {
      return { data: new Date().toISOString() };
    },
  },
  Mutation: {
    ping: () => {
      return { data: "pong" };
    },
  },
};

export default [defaultResolver, stationResolvers, journeyResolvers];
