USE city_bikes;

CREATE TABLE IF NOT EXISTS `stations` (
  id INT NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  address VARCHAR(50) NOT NULL,
  city VARCHAR(50) NOT NULL,
  operator VARCHAR(50) NOT NULL,
  capacities INT NOT NULL,
  lng NUMERIC (11,8) NOT NULL,
  lat NUMERIC (11,8) NOT NULL
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `journeys` (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  depart_station_id INT NOT NULL REFERENCES stations(id) ON DELETE CASCADE ON UPDATE CASCADE,
  depart_time DATETIME NOT NULL,
  return_station_id INT NOT NULL REFERENCES stations(id) ON DELETE CASCADE ON UPDATE CASCADE,
  return_time DATETIME NOT NULL,
  distance INT NOT NULL,
  duration INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;