import { StationDto, ListStationDto } from "../dtos";

interface ListStationRepo {
  find(dto: ListStationDto): Promise<StationDto[] | []>;
  count(dto: ListStationDto): Promise<number>;
}

export default ListStationRepo;
