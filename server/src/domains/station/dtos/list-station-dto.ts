interface StationFilterDto {
  name?: string;
  address?: string;
  city?: string;
  operator?: string;
  capacities?: number;
}

interface ListStationDto {
  page?: number;
  perPage?: number;
  sortField?: string;
  sortOrder?: string;
  filter?: StationFilterDto;
}

export default ListStationDto;
