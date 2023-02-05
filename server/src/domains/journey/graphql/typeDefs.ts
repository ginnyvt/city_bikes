import { gql } from "apollo-server-express";

export default gql`
  extend type Query {
    journeys(
      page: Int
      perPage: Int
      sortField: String
      sortOrder: String
      filter: JourneyFilter
    ): JourneyEntityResponseCollection
  }

  type JourneyEntity {
    id: ID
    departStationId: Int!
    departTime: String!
    returnStationId: Int!
    returnTime: String!
    distance: Int!
    duration: Int!
    departStation: StationEntity
    returnStation: StationEntity
  }

  type JourneyEntityResponse {
    data: JourneyEntity
  }

  type JourneyEntityResponseCollection {
    data: [JourneyEntity]
    meta: ResponseCollectionMeta
  }

  input JourneyFilter {
    departStationId: Int
    returnStationId: Int
    distance: Int
    duration: Int
  }
`;
