import { Jsonifier } from "@powerkernel/common";
import { StationDto } from "../dtos";

/**
 * class Station
 */
class Station implements Jsonifier<StationDto> {
  // private attributes
  private wrappedId!: number;
  private wrappedName!: string;
  private wrappedAddress!: string;
  private wrappedCity!: string;
  private wrappedOperator!: string;
  private wrappedCapacities!: number;
  private wrappedLongitude!: number;
  private wrappedLatitude!: number;

  // constructor
  constructor(dto: StationDto) {
    this.id = dto.id;
    this.name = dto.name;
    this.address = dto.address;
    this.city = dto.city;
    this.operator = dto.operator;
    this.capacities = dto.capacities;
    this.longitude = dto.longitude;
    this.latitude = dto.latitude;
  }

  // id
  public get id(): number {
    return this.wrappedId;
  }
  public set id(id: number) {
    this.wrappedId = id;
  }

  // name
  public get name(): string {
    return this.wrappedName;
  }
  public set name(name: string) {
    this.wrappedName = name;
  }

  // address
  public get address(): string {
    return this.wrappedAddress;
  }
  public set address(address: string) {
    this.wrappedAddress = address;
  }

  // city
  public get city(): string {
    return this.wrappedCity;
  }
  public set city(city: string) {
    this.wrappedCity = city;
  }

  // operator
  public get operator(): string {
    return this.wrappedOperator;
  }
  public set operator(operator: string) {
    this.wrappedOperator = operator;
  }

  // capacities
  public get capacities(): number {
    return this.wrappedCapacities;
  }
  public set capacities(capacities: number) {
    this.wrappedCapacities = capacities;
  }

  // longitude
  public get longitude(): number {
    return this.wrappedLongitude;
  }
  public set longitude(longitude: number) {
    this.wrappedLongitude = longitude;
  }

  // latitude
  public get latitude(): number {
    return this.wrappedLatitude;
  }
  public set latitude(latitude: number) {
    this.wrappedLatitude = latitude;
  }

  // factory method
  public static create(dto: StationDto) {
    return new Station(dto);
  }

  // to json
  jsonify() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      city: this.city,
      operator: this.operator,
      capacities: this.capacities,
      longitude: this.longitude,
      latitude: this.latitude,
    };
  }
}

export default Station;
