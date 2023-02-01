import container from "../../../config/container";
import IDENTIFIERS from "../../../config/identifiers";
import {
  ListStationAction,
  ViewStationAction,
  CountDepartJourneyAction,
  CountReturnJourneyAction,
  CalAvgDistanceDepartFromAction,
  CalAvgDistanceReturnAtAction,
} from "../actions";

import { ListStationDto, StationDto } from "../dtos";

export default {
  Query: {
    stations: async (_parent: unknown, args: ListStationDto) => {
      const act = container.get<ListStationAction>(
        IDENTIFIERS.ListStationAction
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

    station: async (
      _parent: unknown,
      args: {
        id: number;
      }
    ) => {
      const act = container.get<ViewStationAction>(
        IDENTIFIERS.ViewStationAction
      );
      return await act.handle(args.id);
    },
  },

  StationEntity: {
    totalDepart: async (station: StationDto) => {
      const act = container.get<CountDepartJourneyAction>(
        IDENTIFIERS.CountDepartJourneyAction
      );
      return await act.handle(station);
    },
    totalReturn: async (station: StationDto) => {
      const act = container.get<CountReturnJourneyAction>(
        IDENTIFIERS.CountReturnJourneyAction
      );
      return await act.handle(station);
    },
    avgDistanceDepartFrom: async (station: StationDto) => {
      const act = container.get<CalAvgDistanceDepartFromAction>(
        IDENTIFIERS.CalAvgDistanceDepartFromAction
      );
      return await act.handle(station);
    },
    avgDistanceReturnAt: async (station: StationDto) => {
      const act = container.get<CalAvgDistanceReturnAtAction>(
        IDENTIFIERS.CalAvgDistanceReturnAtAction
      );
      return await act.handle(station);
    },
  },
};
