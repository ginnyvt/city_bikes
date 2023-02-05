/* npm imports */
import { inject, injectable } from "inversify";

/* local imports */
import IDENTIFIERS from "../../../config/identifiers";

/* type imports */
import type { StationDto } from "../dtos";
import type { ViewStationRepo } from "../repositories";

/**
 * class CalAvgDistanceDepartFromAction
 */
@injectable()
class CalAvgDistanceDepartFromAction {
  private repo: ViewStationRepo;

  constructor(
    @inject(IDENTIFIERS.ViewStationRepo)
    repo: ViewStationRepo
  ) {
    this.repo = repo;
  }

  public async handle(dto: StationDto): Promise<number | null> {
    return await this.repo.calAvgDistanceDepartFrom(dto.id);
  }
}

export default CalAvgDistanceDepartFromAction;
