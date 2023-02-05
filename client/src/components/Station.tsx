import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { gql, useQuery } from "@apollo/client";
import { Table, TableRow, TableCell, Grid, Paper, CircularProgress, Box } from "@mui/material";
import { useParams } from "react-router-dom";

export default function Station() {
	const { id } = useParams();
	const GET_STATION = gql`
		query Station($stationId: Int!) {
			station(id: $stationId) {
				data {
					address
					avgDistanceDepartFrom
					avgDistanceReturnAt
					capacities
					city
					id
					latitude
					longitude
					name
					operator
					totalDepart
					totalReturn
				}
			}
		}
	`;
	const { data, loading, error } = useQuery(GET_STATION, {
		variables: {
			stationId: +id!,
		},
	});

	if (loading)
		return (
			<Box sx={{ display: "flex" }}>
				<CircularProgress />
			</Box>
		);

	if (error) return <p>Error : {error.message}</p>;

	return (
		<Grid item xs={12}>
			<Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
				<Card sx={{ maxWidth: "100%" }}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							{data.station.data.name}
						</Typography>
						<Typography variant="body2" color="text.secondary">
							{data.station.data.address}, {data.station.data.city}
						</Typography>

						<div>
							<hr />
						</div>

						<Table>
							<TableRow>
								<TableCell variant="head">Operator</TableCell>
								<TableCell>{data.station.data.operator}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell variant="head">Capacity</TableCell>
								<TableCell>{data.station.data.capacities}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell variant="head">Total Departures</TableCell>
								<TableCell>{data.station.data.totalDepart}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell variant="head">Total Arrivals</TableCell>
								<TableCell>{data.station.data.totalReturn}</TableCell>
							</TableRow>

							<TableRow>
								<TableCell variant="head">AVG Departure Distance (km)</TableCell>
								<TableCell>{(data.station.data.avgDistanceDepartFrom / 1000).toFixed(2)}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell variant="head">AVG Arrival Distance (km)</TableCell>
								<TableCell>{(data.station.data.avgDistanceReturnAt / 1000).toFixed(2)}</TableCell>
							</TableRow>
						</Table>
					</CardContent>
				</Card>
			</Paper>
		</Grid>
	);
}
