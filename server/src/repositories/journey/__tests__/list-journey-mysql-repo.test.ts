import { ListJourneyMysqlRepo } from "..";

import { prisma } from "../../../db";

it("should generate the correct filtered object", () => {
  const filteredDto = {
    filter: {
      departStationId: 1001,
      returnStationId: 1002,
      distance: 2344,
      duration: 134,
    },
  };
  const repo = new ListJourneyMysqlRepo();
  const filteredObject = repo.generateFilteredObject(filteredDto);

  expect(filteredObject).toEqual({
    depart_station_id: {
      equals: filteredDto.filter.departStationId,
    },
    return_station_id: {
      equals: filteredDto.filter.returnStationId,
    },
    distance: {
      equals: filteredDto.filter.distance,
    },
    duration: {
      equals: filteredDto.filter.duration,
    },
  });
});

it("should list the journeys from the database", async () => {
  const repo = new ListJourneyMysqlRepo();

  const mockData = [
    {
      id: 101,
      depart_station_id: 1001,
      depart_time: new Date("2023-02-01T12:25:00"),
      return_station_id: 1002,
      return_time: new Date("2023-02-01T12:30:00"),
      distance: 1334,
      duration: 2455,
    },
    {
      id: 102,
      depart_station_id: 1003,
      depart_time: new Date("2023-02-02T12:25:00"),
      return_station_id: 1004,
      return_time: new Date("2023-02-02T12:30:00"),
      distance: 1334,
      duration: 2455,
    },
  ];
  // start: mock
  jest.spyOn(prisma.journeys, "findMany").mockResolvedValue(mockData);
  // end: mock

  const result = await repo.find({});
  expect(result).toEqual(
    mockData.map((item) => {
      return {
        id: item.id,
        departStationId: item.depart_station_id,
        departTime: item.depart_time,
        returnStationId: item.return_station_id,
        returnTime: item.return_time,
        distance: item.distance,
        duration: item.duration,
      };
    })
  );
});

it("should return an empty list if no data found from the database", async () => {
  // start: mock
  jest.spyOn(prisma.journeys, "findMany").mockResolvedValue([]);
  // end: mock

  const repo = new ListJourneyMysqlRepo();
  const result = await repo.find({});
  expect(result).toEqual([]);
});

it("should count the journeys from the database", async () => {
  // start: mock
  jest.spyOn(prisma.journeys, "count").mockResolvedValue(10);
  // end: mock

  const repo = new ListJourneyMysqlRepo();

  const result = await repo.count({});
  expect(result).toEqual(10);
});
