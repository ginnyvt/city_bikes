/* npm imports */
import { inject, injectable } from "inversify";

/* local imports */
import IDENTIFIERS from "../../../config/identifiers";
import { StationDto } from "../dtos";
import { Station } from "../entities";

/* type imports */
import type { ViewStationRepo } from "../repositories";

/**
 * class ViewStationAction
 */
@injectable()
class ViewStationAction {
  private repo: ViewStationRepo;

  constructor(
    @inject(IDENTIFIERS.ViewStationRepo)
    repo: ViewStationRepo
  ) {
    this.repo = repo;
  }

  public async handle(id: number): Promise<StationDto> {
    const dto = await this.repo.findOne(id);

    if (dto === null) {
      throw new Error("Station not found");
    }

    return Station.create(dto).jsonify();
  }
}

export default ViewStationAction;
