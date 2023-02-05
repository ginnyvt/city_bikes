import { Container } from "inversify";
import IDENTIFIERS from "../../../config/identifiers";
import { ListJourneyMysqlRepo } from "../../../repositories/journey";
import { CountJourneyAction, ListJourneyAction } from "./../actions";

import { ListJourneyRepo } from "./../repositories";

const bindRepositories = (container: Container) => {
  container
    .bind<ListJourneyRepo>(IDENTIFIERS.ListJourneyRepo)
    .to(ListJourneyMysqlRepo);
};

const bindActions = (container: Container) => {
  container
    .bind<ListJourneyAction>(IDENTIFIERS.ListJourneyAction)
    .to(ListJourneyAction);
  container
    .bind<CountJourneyAction>(IDENTIFIERS.CountJourneyAction)
    .to(CountJourneyAction);
};

const binding = (container: Container) => {
  bindRepositories(container);
  bindActions(container);
};

export default binding;
