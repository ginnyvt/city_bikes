import { injectable } from "inversify";
import container from "../../../../config/container";
import IDENTIFIERS from "../../../../config/identifiers";
import { CountJourneyAction } from "..";
import { ListJourneyDto } from "../../dtos";

it("should perform the count action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.ListJourneyRepo);
  container
    .bind<ListJourneyMockRepo>(IDENTIFIERS.ListJourneyRepo)
    .to(ListJourneyMockRepo);
  // end: mock

  const action = container.get<CountJourneyAction>(
    IDENTIFIERS.CountJourneyAction
  );
  const result = await action.handle({});
  expect(result).toEqual(10);
});

/**
 * Mock Repo
 */
@injectable()
class ListJourneyMockRepo {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async count(dto: ListJourneyDto): Promise<number> {
    return 10;
  }
}
