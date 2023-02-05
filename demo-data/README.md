# Demo Data

Follow the following steps to validate, filter and import CSV files to databases. Only data that has non-empty values and journeys that covered more than 10 meters in distance and last more than 10 seconds are imported.

For convenience, I also provided `assets/demo-data.sql.gz` to insert all the demo data to database directly. You can google for more information to load gzip file to db.

## Preparation

1. Download provided csv file for the stations data and rename it to `stations.csv`.
1. Download provided csv files for monthly journeys data and rename it to `2021-05.csv`, `2021-06.csv` and `2021-07.csv`.
1. Place them in the `resources` folder.

## Execution

1. Run `npm i` to install the npm packages.
1. Run `npm run process-stations` to validate and filter stations data.
1. Run `npm run process-journeys` to validate and filter journeys data.

The proceeded files is output in the `output` folder.

## Import to DB

1. Run mariadb docker container.
1. Run backend server (see `server/README.md` to start the server).
1. Run `docker exec -it mariadb sh -c 'exec mariadb -uroot -p"$MARIADB_ROOT_PASSWORD"'` to execute into mariadb container.
1. Load csv files

   ```sql
   USE city_bikes;

   LOAD DATA LOCAL INFILE "/output/stations.csv"
   INTO TABLE stations
   COLUMNS TERMINATED BY ','
   ENCLOSED BY '"'
   LINES TERMINATED BY '\n'
   (@dummy,id,@dummy,@dummy,name,address,@dummy,city,@dummy,operator,capacities,lng,lat);

   LOAD DATA LOCAL INFILE "/output/2021-05.csv"
   INTO TABLE journeys
   COLUMNS TERMINATED BY ','
   ENCLOSED BY '"'
   LINES TERMINATED BY '\n'
   IGNORE 1 LINES
   (depart_time,return_time,depart_station_id,@dummy,return_station_id,@dummy,distance,duration)
   SET id = NULL;

   LOAD DATA LOCAL INFILE "/output/2021-06.csv"
   INTO TABLE journeys
   COLUMNS TERMINATED BY ','
   ENCLOSED BY '"'
   LINES TERMINATED BY '\n'
   IGNORE 1 LINES
   (depart_time,return_time,depart_station_id,@dummy,return_station_id,@dummy,distance,duration)
   SET id = NULL;

   LOAD DATA LOCAL INFILE "/output/2021-07.csv"
   INTO TABLE journeys
   COLUMNS TERMINATED BY ','
   ENCLOSED BY '"'
   LINES TERMINATED BY '\n'
   IGNORE 1 LINES
   (depart_time,return_time,depart_station_id,@dummy,return_station_id,@dummy,distance,duration)
   SET id = NULL;

   ```
