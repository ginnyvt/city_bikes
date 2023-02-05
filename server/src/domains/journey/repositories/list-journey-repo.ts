import { JourneyDto, ListJourneyDto } from "../dtos";

interface ListJourneyRepo {
  find(dto: ListJourneyDto): Promise<JourneyDto[] | []>;
  count(dto: ListJourneyDto): Promise<number>;
}

export default ListJourneyRepo;
