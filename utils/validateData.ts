import validator from "validator";

export function isLatitude(lat: number) {
	return isFinite(lat) && Math.abs(lat) <= 90;
}

export function isLongitude(lng: number) {
	return isFinite(lng) && Math.abs(lng) <= 180;
}

export function trimColValues(array: any[]) {
	for (let i = 0; i < array.length; i++) {
		array[i] = validator.trim(array[i]);
	}
	return array;
}
