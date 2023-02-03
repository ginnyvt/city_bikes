import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    station(id: Int!): StationEntityResponse
    stations(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: StationFilter
    ): StationEntityResponseCollection
  }

  type StationEntity {
    id: Int!
    name: String!
    address: String!
    city: String!
    operator: String!
    capacities: Int!
    longitude: Float!
    latitude: Float!
    totalDepart: Int!
    totalReturn: Int!
    avgDistanceDepartFrom: Float!
    avgDistanceReturnAt: Float!
  }

  type StationEntityResponse {
    data: StationEntity
  }

  type StationEntityResponseCollection {
    data: [StationEntity]
    meta: ResponseCollectionMeta
  }

  input StationFilter {
    name: String
    address: String
    city: String
    operator: String
    capacities: Int
  }
`;
