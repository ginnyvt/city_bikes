import * as React from "react";
import { DataGrid, GridColDef, GridFilterModel, GridSortModel } from "@mui/x-data-grid";
import { useQuery, gql } from "@apollo/client";
import { Box, CircularProgress, Grid, Paper } from "@mui/material";
import { Link } from "react-router-dom";

const columns: GridColDef[] = [
	{
		field: "id",
		headerName: "ID",
		renderCell: (params) => {
			return <Link to={`/stations/${params.value}`}>{params.value}</Link>;
		},
	},
	{
		field: "name",
		headerName: "Name",
		flex: 1,
	},
	{
		field: "address",
		headerName: "Address",
		flex: 1,
	},
	{
		field: "city",
		headerName: "City",
		flex: 1,
	},
	{
		field: "operator",
		headerName: "Operator",
		flex: 1,
	},
	{
		field: "capacities",
		headerName: "Capacities",
		flex: 1,
	},
];

export default function Stations() {
	const [page, setPage] = React.useState(0);
	const [pageSize, setPageSize] = React.useState(10);
	const [sortModel, setSortModel] = React.useState<GridSortModel>([]);
	const [sortOrder, setSortOrder] = React.useState("");
	const [sortField, setSortField] = React.useState("");

	const GET_STATIONS = gql`
		query Stations($filter: StationFilter, $sortOrder: String, $sortField: String, $page: Int, $perPage: Int) {
			stations(filter: $filter, sortOrder: $sortOrder, sortField: $sortField, page: $page, perPage: $perPage) {
				data {
					id
					name
					address
					capacities
					city
					operator
				}
				meta {
					pagination {
						total
					}
				}
			}
		}
	`;

	const { data, loading, error } = useQuery(GET_STATIONS, {
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
						rows={data.stations.data}
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
						rowCount={data.stations.meta.pagination.total}
						rowsPerPageOptions={[10]}
						autoHeight={true}
					/>
				</div>
			</Paper>
		</Grid>
	);
}
