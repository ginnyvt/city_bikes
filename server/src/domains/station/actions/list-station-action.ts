/* npm imports */
import config from "config";
import { inject, injectable } from "inversify";
import container from "../../../config/container";

/* local imports */
import IDENTIFIERS from "../../../config/identifiers";
import { StationDto, ListStationDto } from "../dtos";

/* type imports */
import type { ListStationRepo } from "../repositories";
import CountStationAction from "./count-station-action";

/**
 * class ListStationAction
 */
@injectable()
class ListStationAction {
  private repo: ListStationRepo;

  constructor(
    @inject(IDENTIFIERS.ListStationRepo)
    repo: ListStationRepo
  ) {
    this.repo = repo;
  }

  public async handle(dto: ListStationDto): Promise<StationDto[] | []> {
    return await this.repo.find(dto);
  }

  public async getPagination(dto: ListStationDto) {
    const countAct = container.get<CountStationAction>(
      IDENTIFIERS.CountStationAction
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

export default ListStationAction;
