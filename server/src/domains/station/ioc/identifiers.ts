const identifiers = {
  // actions
  ListStationAction: Symbol.for("ListStationAction"),
  ViewStationAction: Symbol.for("ViewStationAction"),
  CountStationAction: Symbol.for("CountStationAction"),
  CountDepartJourneyAction: Symbol.for("CountDepartJourneyAction"),
  CountReturnJourneyAction: Symbol.for("CountReturnJourneyAction"),
  CalAvgDistanceDepartFromAction: Symbol.for("CalAvgDistanceDepartFromAction"),
  CalAvgDistanceReturnAtAction: Symbol.for("CalAvgDistanceReturnAtAction"),

  // repo
  ListStationRepo: Symbol.for("ListStationRepo"),
  ViewStationRepo: Symbol.for("ViewStationRepo"),
};

export default identifiers;
