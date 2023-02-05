import { gql } from "apollo-server-express";

import stationSchema from "../domains/station/graphql/typeDefs";
import journeySchema from "../domains/journey/graphql/typeDefs";

const linkSchema = gql`
  type Query {
    time: StringResponse
  }
  type Mutation {
    ping: StringResponse
  }
  type StringResponse {
    data: String
  }

  input PaginationArg {
    page: Int
    pageSize: Int
    start: Int
    limit: Int
  }

  type Pagination {
    total: Int!
    page: Int!
    pageSize: Int!
    pageCount: Int!
  }

  type ResponseCollectionMeta {
    pagination: Pagination!
  }
`;

export default [linkSchema, stationSchema, journeySchema];
