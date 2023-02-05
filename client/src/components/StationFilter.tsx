import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { gql, useQuery } from "@apollo/client";

export interface StationType {
	id: number;
	name: string;
}

interface StationFilterProps {
	title: string;
	selected: StationType | null;
	onStationSelected: (value: StationType | null) => void;
}

export default function StationFilter(props: StationFilterProps) {
	const [value, setValue] = React.useState<StationType | null>(null);
	const [inputValue, setInputValue] = React.useState("");
	const [options, setOptions] = React.useState<StationType[]>([]);

	const GET_STATIONS = gql`
		query Stations($filter: StationFilter, $sortOrder: String, $sortField: String) {
			stations(filter: $filter, sortOrder: $sortOrder, sortField: $sortField) {
				data {
					id
					name
				}
			}
		}
	`;

	const { data } = useQuery(GET_STATIONS, {
		variables: {
			filter: {
				name: inputValue,
			},
			sortOrder: "asc",
			sortField: "name",
		},
	});

	React.useEffect(() => {
		if (inputValue && data) {
			setOptions(data.stations.data);
		} else {
			setOptions([]);
		}
	}, [data, inputValue]);

	return (
		<Autocomplete
			sx={{ width: "100%" }}
			getOptionLabel={(option) => (typeof option === "string" ? option : option.name)}
			isOptionEqualToValue={(o, v) => {
				return o.id === v.id;
			}}
			filterOptions={(x) => x}
			options={options}
			autoComplete
			includeInputInList
			filterSelectedOptions
			value={value ?? props.selected}
			noOptionsText="Type to search"
			onChange={(_event, newValue: StationType | null) => {
				setOptions(newValue ? [newValue, ...options] : options);
				setValue(newValue);
				props.onStationSelected(newValue);
			}}
			onInputChange={(_event, newInputValue) => {
				setInputValue(newInputValue);
			}}
			renderInput={(params) => <TextField {...params} label={props.title} fullWidth />}
		/>
	);
}
