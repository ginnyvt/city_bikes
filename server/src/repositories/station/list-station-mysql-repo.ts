/* npm imports */
import { injectable } from "inversify";
import config from "config";

/* local imports */
import { StationDto, ListStationDto } from "../../domains/station/dtos";
import { prisma } from "../../db";

/* type imports */
import type { ListStationRepo } from "../../domains/station/repositories";
import { Prisma } from "@prisma/client";

/**
 * class ListStationMysqlRepo
 */
@injectable()
class ListStationMysqlRepo implements ListStationRepo {
  public generateFilteredObject(dto: ListStationDto) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filteredObject: any = {};
    if (dto.filter?.name) {
      filteredObject.name = {
        contains: dto.filter.name,
      };
    }
    if (dto.filter?.address) {
      filteredObject.address = {
        contains: dto.filter.address,
      };
    }

    if (dto.filter?.city) {
      filteredObject.city = {
        contains: dto.filter.city,
      };
    }

    if (dto.filter?.operator) {
      filteredObject.operator = {
        contains: dto.filter.operator,
      };
    }

    if (dto.filter?.capacities) {
      filteredObject.capacities = {
        equals: dto.filter.capacities,
      };
    }

    return filteredObject;
  }

  async find(dto: ListStationDto): Promise<StationDto[] | []> {
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

    const stations = await prisma.stations.findMany({
      take,
      skip,
      where: filteredObject,
      orderBy: [sortedObject],
    });

    return stations.map((station) => {
      return {
        id: station.id,
        name: station.name,
        address: station.address,
        city: station.city,
        operator: station.operator,
        capacities: station.capacities,
        longitude: station.lng.toNumber(),
        latitude: station.lat.toNumber(),
      };
    });
  }

  async count(dto: ListStationDto): Promise<number> {
    const filteredObject = this.generateFilteredObject(dto);
    return await prisma.stations.count({
      where: filteredObject,
    });
  }
}

export default ListStationMysqlRepo;
