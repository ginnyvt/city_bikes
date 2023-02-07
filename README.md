# City bikes demo project

A fullstack web application for displaying data from journeys made with city bikes in the Helsinki Capital area.

## Structure

- `client`: contains front-end react codes.
- `demo-data`: contains scripts for processing data.
- `mariadb`: contains scripts for starting mariadb server in docker.
- `server`: contains source codes to run backend server.

## Summary

### Data import

- [x] Import data from the CSV files to a Mariadb
- [x] Validate data before importing
- [x] Data that has empty value does not get imported
- [x] Don't import journeys that lasted for less than ten seconds
- [x] Don't import journeys that covered distances shorter than 10 meters

### Journey list view

#### Recommended

- [x] List journeys
- [x] For each journey show departure and return stations, covered distance in kilometers and duration in minutes

#### Additional

- [x] Pagination
- [x] Ordering per column
- [x] Searching by depart/return station name
- [ ] Filtering

### Station list

#### Recommended

- [x] List all the stations

#### Additional

- [x] Pagination
- [x] Ordering per column
- [ ] Searching

### Single station view

#### Recommended

- [x] Station name
- [x] Station address
- [x] Total number of journeys starting from the station
- [x] Total number of journeys ending at the station

#### Additional

- [x] Station location on the map
- [x] The average distance of a journey starting from the station
- [x] The average distance of a journey ending at the station
- [ ] Top 5 most popular return stations for journeys starting from the station
- [ ] Top 5 most popular departure stations for journeys ending at the station
- [ ] Ability to filter all the calculations per month

## Surprise us with

- [ ] Endpoints to store new journeys data or new bicycle stations
- [x] Running backend in Docker
- [x] Running backend in Cloud
- [ ] Implement E2E tests
- [ ] Create UI for adding journeys or bicycle stations

## Demo

Link to [demo](https://city-bikes-client-ingress-citybikes-ginnyvt.cloud.okteto.net)

## Authors

- [ginnyvt](https://github.com/ginnyvt)

## License

[MIT](https://choosealicense.com/licenses/mit/)
