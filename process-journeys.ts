import path from "path";
import fs from "fs";
import { parse, transform, stringify } from "csv";
import { trimColValues } from "./utils/validateData";

import stationIds from "./output/stationIds.json";

//const stationIds: number[] = [...sids];

const inputFilePath1 = path.join(__dirname, "./resources/2021-05.csv");
const inputFilePath2 = path.join(__dirname, "./resources/2021-06.csv");
const inputFilePath3 = path.join(__dirname, "./resources/2021-07.csv");
const outputFilePath1 = path.join(__dirname, "./output/2021-05.csv");
const outputFilePath2 = path.join(__dirname, "./output/2021-06.csv");
const outputFilePath3 = path.join(__dirname, "./output/2021-07.csv");

function processJourneyData(inputFilePath: fs.PathLike, outputFilePath: fs.PathLike) {
	fs
		.createReadStream(inputFilePath)
		.pipe(parse({ delimiter: ",", from_line: 2 }))
		.pipe(
			transform(function (array) {
				const data = trimColValues(array);
				//validate columns
				if (data.length !== 8) {
					return;
				}
				// validate non empty values
				if (
					data[0] === "" ||
					data[1] === "" ||
					data[2] === "" ||
					data[3] === "" ||
					data[4] === "" ||
					data[5] === "" ||
					data[6] === "" ||
					data[7] === ""
				) {
					return;
				}

				if (data[6] < 10 || data[7] < 10) {
					return;
				}

				// make sure station id exists
				if (!stationIds.includes(+data[2] as number) || !stationIds.includes(+data[4])) {
					return;
				}
				return data;
			})
		)
		.pipe(stringify())
		.pipe(fs.createWriteStream(outputFilePath));
}

processJourneyData(inputFilePath1, outputFilePath1);
processJourneyData(inputFilePath2, outputFilePath2);
processJourneyData(inputFilePath3, outputFilePath3);
