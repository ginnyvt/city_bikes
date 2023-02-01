import { injectable } from "inversify";
import container from "../../../../config/container";
import IDENTIFIERS from "../../../../config/identifiers";
import { ListJourneyAction } from "..";
import { ListJourneyDto, JourneyDto } from "../../dtos";
import config from "config";

it("should perform the list action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.ListJourneyRepo);
  container
    .bind<ListJourneyMockRepo>(IDENTIFIERS.ListJourneyRepo)
    .to(ListJourneyMockRepo);
  // end: mock

  // test
  const action = container.get<ListJourneyAction>(
    IDENTIFIERS.ListJourneyAction
  );
  const result = await action.handle({});

  // result
  expect(result).toEqual([
    {
      id: 101,
      departStationId: 1001,
      departTime: new Date("2023-02-01T12:25:00"),
      returnStationId: 1002,
      returnTime: new Date("2023-02-01T12:30:00"),
      distance: 1334,
      duration: 2455,
    },
    {
      id: 102,
      departStationId: 1003,
      departTime: new Date("2023-02-02T12:25:00"),
      returnStationId: 1004,
      returnTime: new Date("2023-02-02T12:30:00"),
      distance: 1334,
      duration: 2455,
    },
  ]);
});

it("should perform the get pagination action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.CountJourneyAction);
  container
    .bind<CountJourneyMockAction>(IDENTIFIERS.CountJourneyAction)
    .to(CountJourneyMockAction);
  // end: mock

  // test
  const action = container.get<ListJourneyAction>(
    IDENTIFIERS.ListJourneyAction
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
class ListJourneyMockRepo {
  async find(dto: ListJourneyDto): Promise<JourneyDto[] | []> {
    if (dto.filter?.distance === 0) {
      return [];
    }
    return [
      {
        id: 101,
        departStationId: 1001,
        departTime: new Date("2023-02-01T12:25:00"),
        returnStationId: 1002,
        returnTime: new Date("2023-02-01T12:30:00"),
        distance: 1334,
        duration: 2455,
      },
      {
        id: 102,
        departStationId: 1003,
        departTime: new Date("2023-02-02T12:25:00"),
        returnStationId: 1004,
        returnTime: new Date("2023-02-02T12:30:00"),
        distance: 1334,
        duration: 2455,
      },
    ];
  }
}

@injectable()
class CountJourneyMockAction {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async handle(dto: ListJourneyDto) {
    return 100;
  }
}
