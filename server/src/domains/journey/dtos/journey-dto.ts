interface JourneyDto {
  id: number;
  departStationId: number;
  departTime: Date;
  returnStationId: number;
  returnTime: Date;
  distance: number;
  duration: number;
}

export default JourneyDto;
