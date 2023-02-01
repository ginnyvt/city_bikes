import { injectable } from "inversify";
import container from "../../../../config/container";
import IDENTIFIERS from "../../../../config/identifiers";
import { CountStationAction } from "..";
import { ListStationDto } from "../../dtos";

it("should perform the count action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.ListStationRepo);
  container
    .bind<ListStationMockRepo>(IDENTIFIERS.ListStationRepo)
    .to(ListStationMockRepo);
  // end: mock

  const action = container.get<CountStationAction>(
    IDENTIFIERS.CountStationAction
  );
  const result = await action.handle({});
  expect(result).toEqual(10);
});

/**
 * Mock Repo
 */
@injectable()
class ListStationMockRepo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async count(dto: ListStationDto): Promise<number> {
    return 10;
  }
}
