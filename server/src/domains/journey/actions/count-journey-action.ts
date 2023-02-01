/* npm imports */
import { inject, injectable } from "inversify";

/* local imports */
import IDENTIFIERS from "../../../config/identifiers";

/* type imports */
import type { ListJourneyDto } from "../dtos";
import type { ListJourneyRepo } from "../repositories";

/**
 * class CountJourneyAction
 */
@injectable()
class CountJourneyAction {
  private repo: ListJourneyRepo;

  constructor(
    @inject(IDENTIFIERS.ListJourneyRepo)
    repo: ListJourneyRepo
  ) {
    this.repo = repo;
  }

  public async handle(dto: ListJourneyDto): Promise<number> {
    return await this.repo.count(dto);
  }
}

export default CountJourneyAction;
