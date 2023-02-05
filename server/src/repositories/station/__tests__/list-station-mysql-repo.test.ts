import { Prisma } from "@prisma/client";
import { ListStationMysqlRepo } from "..";
import { prisma } from "../../../db";

it("should generate the correct filtered object", () => {
  const filteredDto = {
    filter: {
      name: "ginny",
      address: "Asemakatu 10",
      city: "Helsinki",
      operator: "Ginny oy",
      capacities: 10,
    },
  };
  const repo = new ListStationMysqlRepo();
  const filteredObject = repo.generateFilteredObject(filteredDto);

  expect(filteredObject).toEqual({
    name: {
      contains: filteredDto.filter.name,
    },
    address: {
      contains: filteredDto.filter.address,
    },
    city: {
      contains: filteredDto.filter.city,
    },
    operator: {
      contains: filteredDto.filter.operator,
    },
    capacities: {
      equals: filteredDto.filter.capacities,
    },
  });
});

it("should list the stations from the database", async () => {
  const repo = new ListStationMysqlRepo();

  const mockData = [
    {
      id: 1001,
      name: "My station",
      address: "Asemakatu 10",
      city: "Helsinki",
      operator: "Ginny Oy",
      capacities: 30,
      lng: new Prisma.Decimal(24.945831),
      lat: new Prisma.Decimal(60.192059),
    },
    {
      id: 1002,
      name: "My station 2",
      address: "Asemakatu 12",
      city: "Espoo",
      operator: "Ginny Oy",
      capacities: 30,
      lng: new Prisma.Decimal(26.945831),
      lat: new Prisma.Decimal(68.192059),
    },
  ];
  // start: mock
  jest.spyOn(prisma.stations, "findMany").mockResolvedValue(mockData);
  // end: mock

  const result = await repo.find({});
  expect(result).toEqual(
    mockData.map((item) => {
      return {
        id: item.id,
        name: item.name,
        address: item.address,
        city: item.city,
        operator: item.operator,
        capacities: item.capacities,
        longitude: item.lng.toNumber(),
        latitude: item.lat.toNumber(),
      };
    })
  );
});

it("should return an empty list if no data found from the database", async () => {
  // start: mock
  jest.spyOn(prisma.stations, "findMany").mockResolvedValue([]);
  // end: mock

  const repo = new ListStationMysqlRepo();
  const result = await repo.find({});
  expect(result).toEqual([]);
});

it("should count the stations from the database", async () => {
  // start: mock
  jest.spyOn(prisma.stations, "count").mockResolvedValue(10);
  // end: mock

  const repo = new ListStationMysqlRepo();

  const result = await repo.count({});
  expect(result).toEqual(10);
});
