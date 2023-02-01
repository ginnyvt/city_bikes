import { injectable } from "inversify";
import container from "../../../../config/container";
import IDENTIFIERS from "../../../../config/identifiers";
import CountReturnJourneyAction from "../count-return-journey-action";

it("should perform the count total return journey action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.ViewStationRepo);
  container
    .bind<ViewStationMockRepo>(IDENTIFIERS.ViewStationRepo)
    .to(ViewStationMockRepo);
  // end: mock

  const action = container.get<CountReturnJourneyAction>(
    IDENTIFIERS.CountReturnJourneyAction
  );

  const dto = {
    id: 1001,
    name: "My station",
    address: "Asemakatu 10",
    city: "Helsinki",
    operator: "Ginny Oy",
    capacities: 30,
    longitude: 24.945831,
    latitude: 60.192059,
  };

  const result = await action.handle(dto);
  expect(result).toEqual(123);

  const nullableResult = await action.handle({
    ...dto,
    id: 0,
  });
  expect(nullableResult).toEqual(null);
});

/**
 * Mock Repo
 */
@injectable()
class ViewStationMockRepo {
  async countReturnJourney(stationId: number): Promise<number | null> {
    if (stationId === 0) {
      return null;
    }
    return 123;
  }
}
