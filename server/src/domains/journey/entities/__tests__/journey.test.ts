import { Journey } from "..";

it("should return a json object", () => {
  const dto = {
    id: 101,
    departStationId: 1001,
    departTime: new Date(),
    returnStationId: 1002,
    returnTime: new Date(),
    distance: 345,
    duration: 133,
  };

  const entity = Journey.create(dto);
  const json = entity.jsonify();
  expect(json).toEqual(dto);
});
