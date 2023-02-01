import container from "../../../config/container";
import IDENTIFIERS from "../../../config/identifiers";
import { ViewStationAction } from "../../station/actions";
import { ListJourneyAction } from "../actions/";
import { JourneyDto, ListJourneyDto } from "../dtos";

export default {
  Query: {
    journeys: async (_parent: unknown, args: ListJourneyDto) => {
      const act = container.get<ListJourneyAction>(
        IDENTIFIERS.ListJourneyAction
      );

      const data = await act.handle(args);
      const pagination = await act.getPagination(args);
      return {
        data: data,
        meta: {
          pagination,
        },
      };
    },
  },

  JourneyEntity: {
    departTime: (journey: JourneyDto) => {
      return new Date(journey.departTime).toISOString();
    },
    returnTime: (journey: JourneyDto) => {
      return new Date(journey.returnTime).toISOString();
    },
    departStation: async (journey: JourneyDto) => {
      const viewStationAct = container.get<ViewStationAction>(
        IDENTIFIERS.ViewStationAction
      );
      const station = await viewStationAct.handle(journey.departStationId);
      return station;
    },
    returnStation: async (journey: JourneyDto) => {
      const viewStationAct = container.get<ViewStationAction>(
        IDENTIFIERS.ViewStationAction
      );
      const station = await viewStationAct.handle(journey.returnStationId);
      return station;
    },
  },
};
