import { injectable } from "inversify";
import container from "../../../../config/container";
import IDENTIFIERS from "../../../../config/identifiers";
import { ListStationAction } from "..";
import { ListStationDto, StationDto } from "../../dtos";
import config from "config";

it("should perform the list action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.ListStationRepo);
  container
    .bind<ListStationMockRepo>(IDENTIFIERS.ListStationRepo)
    .to(ListStationMockRepo);
  // end: mock

  // test
  const action = container.get<ListStationAction>(
    IDENTIFIERS.ListStationAction
  );
  const result = await action.handle({});

  // result
  expect(result).toEqual([
    {
      id: 1001,
      name: "My station",
      address: "Asemakatu 10",
      city: "Helsinki",
      operator: "Ginny Oy",
      capacities: 30,
      longitude: 24.945831,
      latitude: 60.192059,
    },
    {
      id: 1002,
      name: "My station",
      address: "Asemakatu 12",
      city: "Espoo",
      operator: "Ginny Oy",
      capacities: 25,
      longitude: 28.945831,
      latitude: 66.192059,
    },
  ]);
});

it("should perform the get pagination action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.CountStationAction);
  container
    .bind<CountStationMockAction>(IDENTIFIERS.CountStationAction)
    .to(CountStationMockAction);
  // end: mock

  // test
  const action = container.get<ListStationAction>(
    IDENTIFIERS.ListStationAction
  );
  const result = await action.getPagination({});
  const pageSizeConf = config.get("pageSize") as {
    default: number;
    max: number;
  };
  const pageSizeTemp = pageSizeConf.default;
  const pageSize =
    pageSizeTemp > pageSizeConf.max ? pageSizeConf.max : pageSizeTemp;
  expect(result).toEqual({
    page: 1,
    pageCount: Math.ceil(100 / pageSize),
    pageSize: pageSize,
    total: 100,
  });
});
/**
 * Mock Repo
 */
@injectable()
class ListStationMockRepo {
  async find(dto: ListStationDto): Promise<StationDto[] | []> {
    if (dto.filter?.name === "null") {
      return [];
    }
    return [
      {
        id: 1001,
        name: "My station",
        address: "Asemakatu 10",
        city: "Helsinki",
        operator: "Ginny Oy",
        capacities: 30,
        longitude: 24.945831,
        latitude: 60.192059,
      },
      {
        id: 1002,
        name: "My station",
        address: "Asemakatu 12",
        city: "Espoo",
        operator: "Ginny Oy",
        capacities: 25,
        longitude: 28.945831,
        latitude: 66.192059,
      },
    ];
  }
}

@injectable()
class CountStationMockAction {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(dto: ListStationDto) {
    return 100;
  }
}
