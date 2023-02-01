import { injectable } from "inversify";
import container from "../../../../config/container";
import IDENTIFIERS from "../../../../config/identifiers";
import { ViewStationAction } from "..";
import { StationDto } from "../../dtos";

it("should perform the view action", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.ViewStationRepo);
  container
    .bind<ViewStationMockRepo>(IDENTIFIERS.ViewStationRepo)
    .to(ViewStationMockRepo);
  // end: mock

  const id = 1001;
  const dto = {
    id,
    name: "My station",
    address: "Asemakatu 10",
    city: "Helsinki",
    operator: "Ginny Oy",
    capacities: 30,
    longitude: 24.945831,
    latitude: 60.192059,
  };
  const action = container.get<ViewStationAction>(
    IDENTIFIERS.ViewStationAction
  );

  // test
  const result = await action.handle(id);
  expect(result).toEqual(dto);
});

it("should throw an error if the entity is not found", async () => {
  // start: mock
  container.unbind(IDENTIFIERS.ViewStationRepo);
  container
    .bind<ViewStationMockRepo>(IDENTIFIERS.ViewStationRepo)
    .to(ViewStationMockRepo);
  // end: mock

  const id = 0;

  // test
  const action = container.get<ViewStationAction>(
    IDENTIFIERS.ViewStationAction
  );
  await expect(action.handle(id)).rejects.toThrow();
});

/**
 * Mock Repo
 */
@injectable()
class ViewStationMockRepo {
  async findOne(id: number): Promise<StationDto | null> {
    if (id === 0) {
      return null;
    }
    return {
      id: 1001,
      name: "My station",
      address: "Asemakatu 10",
      city: "Helsinki",
      operator: "Ginny Oy",
      capacities: 30,
      longitude: 24.945831,
      latitude: 60.192059,
    };
  }
}
