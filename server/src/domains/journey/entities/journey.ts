import { Jsonifier } from "@powerkernel/common";
import { JourneyDto } from "../dtos";

/**
 * class Journey
 */
class Journey implements Jsonifier<JourneyDto> {
  // private attributes
  private wrappedId!: number;
  private wrappedDepartStationId!: number;
  private wrappedDepartTime!: Date;
  private wrappedReturnStationId!: number;
  private wrappedReturnTime!: Date;
  private wrappedDistance!: number;
  private wrappedDuration!: number;

  // constructor
  constructor(dto: JourneyDto) {
    this.id = dto.id;
    this.departStationId = dto.departStationId;
    this.departTime = dto.departTime;
    this.returnStationId = dto.returnStationId;
    this.returnTime = dto.returnTime;
    this.distance = dto.distance;
    this.duration = dto.duration;
  }

  // id
  public get id(): number {
    return this.wrappedId;
  }
  public set id(id: number) {
    this.wrappedId = id;
  }

  // departStationId
  public get departStationId(): number {
    return this.wrappedDepartStationId;
  }
  public set departStationId(dId: number) {
    this.wrappedDepartStationId = dId;
  }

  // departTime
  public get departTime(): Date {
    return this.wrappedDepartTime;
  }
  public set departTime(dTime: Date) {
    this.wrappedDepartTime = dTime;
  }

  // returnStationId
  public get returnStationId(): number {
    return this.wrappedReturnStationId;
  }
  public set returnStationId(rId: number) {
    this.wrappedReturnStationId = rId;
  }

  // returnTime
  public get returnTime(): Date {
    return this.wrappedReturnTime;
  }
  public set returnTime(rTime: Date) {
    this.wrappedReturnTime = rTime;
  }

  // distance
  public get distance(): number {
    return this.wrappedDistance;
  }
  public set distance(distance: number) {
    this.wrappedDistance = distance;
  }

  // duration
  public get duration(): number {
    return this.wrappedDuration;
  }
  public set duration(diuration: number) {
    this.wrappedDuration = diuration;
  }

  // factory method
  public static create(dto: JourneyDto) {
    return new Journey(dto);
  }

  // to json
  jsonify() {
    return {
      id: this.id,
      departStationId: this.departStationId,
      departTime: this.departTime,
      returnStationId: this.returnStationId,
      returnTime: this.returnTime,
      distance: this.distance,
      duration: this.duration,
    };
  }
}

export default Journey;
