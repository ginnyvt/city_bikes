import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const googleMapsApiKey = process.env.REACT_APP_MAPS_API;

interface MapProps {
	lat: number;
	lng: number;
}
export default function Map(props: MapProps) {
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: googleMapsApiKey || "",
	});

	const containerStyle = {
		width: "100%",
		height: "100%",
	};

	const center = {
		lat: props.lat,
		lng: props.lng,
	};

	return isLoaded ? (
		<GoogleMap mapContainerStyle={containerStyle} center={center} zoom={13}>
			<Marker position={center} />
		</GoogleMap>
	) : (
		<></>
	);
}
