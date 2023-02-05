import path from "path";
import fs from "fs";
import { parse, transform, stringify } from "csv";
import { trimColValues, isLongitude, isLatitude } from "./utils/validateData";

const inputFilePath1 = path.join(__dirname, "./resources/stations.csv");
const outputFilePath1 = path.join(__dirname, "./output/stations.csv");

function processStationData() {
	const stationIds: any[] = [];
	fs
		.createReadStream(inputFilePath1)
		.pipe(parse({ delimiter: ",", from_line: 2 }))
		.pipe(
			transform(function (array) {
				const data = trimColValues(array);
				//validate columns
				if (data.length !== 13) {
					return;
				}
				// validate non empty values
				if (
					data[1] === "" ||
					data[2] === "" ||
					data[3] === "" ||
					data[4] === "" ||
					data[5] === "" ||
					data[6] === "" ||
					data[7] === "" ||
					data[8] === "" ||
					data[9] === "" ||
					data[10] === "" ||
					data[11] === "" ||
					data[12] === ""
				) {
					return;
				}
				//validate lat long
				if (!isLongitude(+data[11]) || !isLatitude(+data[12])) {
					return;
				}
				stationIds.push(+data[1]);
				return data;
			})
		)
		.pipe(stringify())
		.pipe(fs.createWriteStream(outputFilePath1))
		.on("finish", () => {
			fs.writeFile(path.join(__dirname, "./output/stationIds.json"), JSON.stringify(stationIds), (err) => {
				if (err) throw err;
			});
		});
}

processStationData();
