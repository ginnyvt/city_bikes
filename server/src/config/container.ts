import { Container } from "inversify";

/* local import */
import bindStationIoC from "../domains/station/ioc/binding";
import bindJourneyIoC from "../domains/journey/ioc/binding";

const container = new Container();
bindStationIoC(container);
bindJourneyIoC(container);

/* exports */
export default container;
