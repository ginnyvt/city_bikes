import { StationDto } from "../dtos";

interface ViewStationRepo {
  findOne(id: number): Promise<StationDto | null>;
  countDepartJourney(stationId: number): Promise<number>;
  countReturnJourney(stationId: number): Promise<number>;
  calAvgDistanceDepartFrom(stationId: number): Promise<number | null>;
  calAvgDistanceReturnAt(stationId: number): Promise<number | null>;
}

export default ViewStationRepo;
