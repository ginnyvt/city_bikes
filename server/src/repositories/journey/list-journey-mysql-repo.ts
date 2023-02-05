/* npm imports */
import { injectable } from "inversify";
import config from "config";

/* local imports */
import { JourneyDto, ListJourneyDto } from "../../domains/journey/dtos";

/* type imports */
import type { ListJourneyRepo } from "../../domains/journey/repositories";
import { Prisma } from "@prisma/client";
import { prisma } from "../../db";

/**
 * class ListJourneyMysqlRepo
 */
@injectable()
class ListJourneyMysqlRepo implements ListJourneyRepo {
  public generateFilteredObject(dto: ListJourneyDto) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredObject: any = {};
    if (dto.filter?.departStationId) {
      filteredObject.depart_station_id = {
        equals: dto.filter.departStationId,
      };
    }
    if (dto.filter?.returnStationId) {
      filteredObject.return_station_id = {
        equals: dto.filter.returnStationId,
      };
    }

    if (dto.filter?.distance) {
      filteredObject.distance = {
        equals: dto.filter.distance,
      };
    }

    if (dto.filter?.duration) {
      filteredObject.duration = {
        equals: dto.filter.duration,
      };
    }

    return filteredObject;
  }

  async find(dto: ListJourneyDto): Promise<JourneyDto[] | []> {
    //pagination
    const pageSize = config.get("pageSize") as { default: number; max: number };
    const take = dto.perPage ?? pageSize.default;
    const page = dto.page ?? 1;
    const skip = (page - 1) * take;

    // sorting
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortedObject: any = {};
    const sortField = dto.sortField ?? "id";
    const sortOrder = dto.sortOrder ?? "asc";

    sortedObject[sortField] =
      sortOrder === "asc" ? Prisma.SortOrder.asc : Prisma.SortOrder.desc;

    //filtering
    const filteredObject = this.generateFilteredObject(dto);

    const journeys = await prisma.journeys.findMany({
      take,
      skip,
      where: filteredObject,
      orderBy: [sortedObject],
    });

    return journeys.map((journey) => {
      return {
        id: journey.id,
        departStationId: journey.depart_station_id,
        departTime: journey.depart_time,
        returnStationId: journey.return_station_id,
        returnTime: journey.return_time,
        distance: journey.distance,
        duration: journey.duration,
      };
    });
  }

  async count(dto: ListJourneyDto): Promise<number> {
    const filteredObject = this.generateFilteredObject(dto);
    return await prisma.journeys.count({
      where: filteredObject,
    });
  }
}

export default ListJourneyMysqlRepo;
