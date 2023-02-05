import * as React from "react";
import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { useQuery, gql } from "@apollo/client";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
	{
		field: "id",
		headerName: "ID",
	},
	{
		field: "departStation",
		headerName: "Depart station",
		renderCell: (params) => {
			return <Link to={`/stations/${params.value.id}`}>{`${params.value.id} - ${params.value.name}`}</Link>;
		},
		flex: 1,
	},

	{
		field: "returnStation",
		headerName: "Return station",
		renderCell: (params) => {
			return <Link to={`/stations/${params.value.id}`}>{`${params.value.id} - ${params.value.name}`}</Link>;
		},
		flex: 1,
	},

	{
		field: "distance",
		headerName: "Distance (km)",
		renderCell: (params) => {
			return (params.value / 1000).toFixed(2);
		},
		flex: 1,
	},
	{
		field: "duration",
		headerName: "Duration (min)",
		renderCell: (params) => {
			return (params.value / 60).toFixed(1);
		},
		flex: 1,
	},
];

export default function Journeys() {
	const [page, setPage] = React.useState(0);
	const [pageSize, setPageSize] = React.useState(10);
	const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
	const [sortOrder, setSortOrder] = React.useState("");
	const [sortField, setSortField] = React.useState("");

	const GET_JOURNEYS = gql`
		query Journeys($page: Int, $perPage: Int, $sortOrder: String, $sortField: String, $filter: JourneyFilter) {
			journeys(page: $page, perPage: $perPage, sortOrder: $sortOrder, sortField: $sortField, filter: $filter) {
				data {
					id
					departStation {
						name
						id
					}
					departTime
					distance
					duration
					returnStation {
						id
						name
					}
					returnTime
				}
				meta {
					pagination {
						total
					}
				}
			}
		}
	`;

	const { data, loading, error } = useQuery(GET_JOURNEYS, {
		variables: {
			page: page + 1,
			perPage: pageSize,
			sortOrder: sortOrder === "" ? null : sortOrder,
			sortField: sortField === "" ? null : sortField,
		},
	});

	const handleSortChange = (model: GridSortModel) => {
		if (model.length !== 0) {
			let _field = model[0].field;
			if (model[0].field === "departStation") _field = "depart_station_id";
			if (model[0].field === "departTime") _field = "depart_time";
			if (model[0].field === "returnTime") _field = "return_time";
			if (model[0].field === "returnStation") _field = "return_station_id";
			setSortField(_field);
			setSortOrder(model[0].sort ?? "asc");
			setSortModel(model);
		} else {
			setSortField("");
			setSortOrder("");
			setSortModel([]);
		}
	};

	const handleFilterChange = (model: GridFilterModel) => {
		console.log(model);
	};

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
				<div style={{ height: "100%", width: "100%" }}>
					<DataGrid
						rows={data.journeys.data}
						disableColumnMenu={true}
						columns={columns}
						sortingMode="server"
						onSortModelChange={handleSortChange}
						filterMode="server"
						sortModel={sortModel}
						onFilterModelChange={handleFilterChange}
						pagination
						page={page}
						pageSize={pageSize}
						paginationMode="server"
						onPageChange={(newPage) => setPage(newPage)}
						onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
						rowCount={data.journeys.meta.pagination.total}
						rowsPerPageOptions={[10]}
						autoHeight={true}
					/>
				</div>
			</Paper>
		</Grid>
	);
}
