/* npm imports */
import { inject, injectable } from "inversify";

/* local imports */
import IDENTIFIERS from "../../../config/identifiers";

/* type imports */
import type { ListStationDto } from "../dtos";
import type { ListStationRepo } from "../repositories";

/**
 * class CountStationAction
 */
@injectable()
class CountStationAction {
  private repo: ListStationRepo;

  constructor(
    @inject(IDENTIFIERS.ListStationRepo)
    repo: ListStationRepo
  ) {
    this.repo = repo;
  }

  public async handle(dto: ListStationDto): Promise<number> {
    return await this.repo.count(dto);
  }
}

export default CountStationAction;
