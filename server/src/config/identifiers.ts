import STATION_IDENTIFIERS from "../domains/station/ioc/identifiers";
import JOURNEY_INDENTIFIERS from "../domains/journey/ioc/identifiers";

const IDENTIFIERS = {
  ...STATION_IDENTIFIERS,
  ...JOURNEY_INDENTIFIERS,
};

export default IDENTIFIERS;
