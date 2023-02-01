interface JourneyFilterDto {
  departStationId?: number;
  returnStationId?: number;
  distance?: number;
  duration?: number;
}

interface ListJourneyDto {
  page?: number;
  perPage?: number;
  sortField?: string;
  sortOrder?: string;
  filter?: JourneyFilterDto;
}

export default ListJourneyDto;
