/* npm imports */
import config from "config";
import { inject, injectable } from "inversify";
import container from "../../../config/container";

/* local imports */
import IDENTIFIERS from "../../../config/identifiers";
import { JourneyDto, ListJourneyDto } from "../dtos";

/* type imports */
import type { ListJourneyRepo } from "../repositories";
import CountJourneyAction from "./count-journey-action";

/**
 * class ListJourneyAction
 */
@injectable()
class ListJourneyAction {
  private repo: ListJourneyRepo;

  constructor(
    @inject(IDENTIFIERS.ListJourneyRepo)
    repo: ListJourneyRepo
  ) {
    this.repo = repo;
  }

  public async handle(dto: ListJourneyDto): Promise<JourneyDto[] | []> {
    return await this.repo.find(dto);
  }

  public async getPagination(dto: ListJourneyDto) {
    const countAct = container.get<CountJourneyAction>(
      IDENTIFIERS.CountJourneyAction
    );
    const pageSizeConf = config.get("pageSize") as {
      default: number;
      max: number;
    };
    const page = dto.page ?? 1;
    const pageSizeTemp = dto.perPage ?? pageSizeConf.default;
    const pageSize =
      pageSizeTemp > pageSizeConf.max ? pageSizeConf.max : pageSizeTemp;
    const total = await countAct.handle(dto);
    return {
      page: page,
      pageCount: Math.ceil(total / pageSize),
      pageSize: pageSize,
      total: total,
    };
  }
}

export default ListJourneyAction;
