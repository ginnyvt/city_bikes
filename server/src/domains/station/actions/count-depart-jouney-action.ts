/* npm imports */
import { inject, injectable } from "inversify";

/* local imports */
import IDENTIFIERS from "../../../config/identifiers";

/* type imports */
import type { StationDto } from "../dtos";
import type { ViewStationRepo } from "../repositories";

/**
 * class CountDepartJourneyAction
 */
@injectable()
class CountDepartJourneyAction {
  private repo: ViewStationRepo;

  constructor(
    @inject(IDENTIFIERS.ViewStationRepo)
    repo: ViewStationRepo
  ) {
    this.repo = repo;
  }

  public async handle(dto: StationDto): Promise<number> {
    return await this.repo.countDepartJourney(dto.id);
  }
}

export default CountDepartJourneyAction;
