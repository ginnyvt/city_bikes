import { Station } from "..";

it("should return a json object", () => {
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

  const entity = Station.create(dto);
  const json = entity.jsonify();
  expect(json).toEqual(dto);
});
