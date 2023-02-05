import { Prisma } from "@prisma/client";
import { ViewStationMysqlRepo } from "..";
import { prisma } from "../../../db";

it("should load single station from the database", async () => {
  const repo = new ViewStationMysqlRepo();
  // start: mock
  const mockData = {
    id: 1001,
    name: "My station",
    address: "Asemakatu 10",
    city: "Helsinki",
    operator: "Ginny Oy",
    capacities: 10,
    lng: new Prisma.Decimal(24.945831),
    lat: new Prisma.Decimal(60.192059),
  };
  jest.spyOn(prisma.stations, "findUnique").mockResolvedValue(mockData);
  // end: mock

  // one result
  const result = await repo.findOne(1001);
  expect(result).toEqual({
    id: mockData.id,
    name: mockData.name,
    address: mockData.address,
    city: mockData.city,
    operator: mockData.operator,
    capacities: mockData.capacities,
    longitude: mockData.lng.toNumber(),
    latitude: mockData.lat.toNumber(),
  });
});

it("should return null if the station is not found", async () => {
  const repo = new ViewStationMysqlRepo();
  // start: mock
  const mockData = null;
  jest.spyOn(prisma.stations, "findUnique").mockResolvedValue(mockData);
  // end: mock
  const result = await repo.findOne(1001);
  expect(result).toEqual(mockData);
});

it("should count total depart/return journeys", async () => {
  const repo = new ViewStationMysqlRepo();

  // start: mock
  jest.spyOn(prisma.journeys, "count").mockResolvedValue(33);
  // end: mock

  const totalDepart = await repo.countDepartJourney(1001);
  expect(totalDepart).toEqual(33);

  const totalReturn = await repo.countReturnJourney(1001);
  expect(totalReturn).toEqual(33);
});

it("should calculate the average distance depart from /return at station", async () => {
  const repo = new ViewStationMysqlRepo();

  // start: mock
  jest.spyOn(prisma.journeys, "aggregate").mockResolvedValue({
    _avg: {
      distance: 123.456,
    },
    _count: {},
    _min: {},
    _max: {},
    _sum: {},
  });
  // end: mock

  const avgDistanceDepartFrom = await repo.calAvgDistanceDepartFrom(1001);
  expect(avgDistanceDepartFrom).toEqual(123.456);

  const avgDistanceReturnAt = await repo.calAvgDistanceReturnAt(1001);
  expect(avgDistanceReturnAt).toEqual(123.456);
});
