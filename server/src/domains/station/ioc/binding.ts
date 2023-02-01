import { Container } from "inversify";
import IDENTIFIERS from "../../../config/identifiers";
import {
  ListStationMysqlRepo,
  ViewStationMysqlRepo,
} from "../../../repositories/station";
import CalAvgDistanceDepartFromAction from "../actions/cal-avg-distance-depart-from-action";
import CalAvgDistanceReturnAtAction from "../actions/cal-avg-distance-return-at-action";
import CountDepartJourneyAction from "../actions/count-depart-jouney-action";
import CountReturnJourneyAction from "../actions/count-return-journey-action";
import {
  CountStationAction,
  ListStationAction,
  ViewStationAction,
} from "./../actions";
import { ListStationRepo, ViewStationRepo } from "./../repositories";

const bindRepositories = (container: Container) => {
  container
    .bind<ListStationRepo>(IDENTIFIERS.ListStationRepo)
    .to(ListStationMysqlRepo);
  container
    .bind<ViewStationRepo>(IDENTIFIERS.ViewStationRepo)
    .to(ViewStationMysqlRepo);
};

const bindActions = (container: Container) => {
  container
    .bind<ListStationAction>(IDENTIFIERS.ListStationAction)
    .to(ListStationAction);
  container
    .bind<ViewStationAction>(IDENTIFIERS.ViewStationAction)
    .to(ViewStationAction);
  container
    .bind<CountStationAction>(IDENTIFIERS.CountStationAction)
    .to(CountStationAction);
  container
    .bind<CountDepartJourneyAction>(IDENTIFIERS.CountDepartJourneyAction)
    .to(CountDepartJourneyAction);
  container
    .bind<CountReturnJourneyAction>(IDENTIFIERS.CountReturnJourneyAction)
    .to(CountReturnJourneyAction);
  container
    .bind<CalAvgDistanceDepartFromAction>(
      IDENTIFIERS.CalAvgDistanceDepartFromAction
    )
    .to(CalAvgDistanceDepartFromAction);
  container
    .bind<CalAvgDistanceReturnAtAction>(
      IDENTIFIERS.CalAvgDistanceReturnAtAction
    )
    .to(CalAvgDistanceReturnAtAction);
};

const binding = (container: Container) => {
  bindRepositories(container);
  bindActions(container);
};

export default binding;
