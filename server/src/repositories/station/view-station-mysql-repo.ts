/* npm imports */
import { injectable } from "inversify";

/* local imports */
import { StationDto } from "../../domains/station/dtos";
import { prisma } from "../../db";

/* type imports */
import type { ViewStationRepo } from "../../domains/station/repositories";

/**
 * class ViewStationMongoRepo
 */
@injectable()
class ViewStationMysqlRepo implements ViewStationRepo {
  async calAvgDistanceDepartFrom(stationId: number): Promise<number | null> {
    const agg = await prisma.journeys.aggregate({
      _avg: {
        distance: true,
      },
      where: {
        depart_station_id: stationId,
      },
    });
    return agg._avg.distance;
  }

  async calAvgDistanceReturnAt(stationId: number): Promise<number | null> {
    const agg = await prisma.journeys.aggregate({
      _avg: {
        distance: true,
      },
      where: {
        return_station_id: stationId,
      },
    });
    return agg._avg.distance;
  }

  async countDepartJourney(stationId: number): Promise<number> {
    return await prisma.journeys.count({
      where: {
        depart_station_id: stationId,
      },
    });
  }

  async countReturnJourney(stationId: number): Promise<number> {
    return await prisma.journeys.count({
      where: {
        return_station_id: stationId,
      },
    });
  }

  async findOne(id: number): Promise<StationDto | null> {
    const station = await prisma.stations.findUnique({
      where: { id },
    });

    if (station === null) return null;

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
  }
}

export default ViewStationMysqlRepo;
