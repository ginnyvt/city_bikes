import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import RouteIcon from "@mui/icons-material/Route";
import PinDropIcon from "@mui/icons-material/PinDrop";

import { Link } from "react-router-dom";

export const mainListItems = (
	<React.Fragment>
		<ListItemButton>
			<ListItemIcon>
				<Link to="/journeys">
					<RouteIcon />
				</Link>
			</ListItemIcon>
			<Link to="/journeys">
				<ListItemText primary="Journeys" />
			</Link>
		</ListItemButton>

		<ListItemButton>
			<ListItemIcon>
				<Link to="/stations">
					<PinDropIcon />
				</Link>
			</ListItemIcon>
			<Link to="/stations">
				<ListItemText primary="Stations" />
			</Link>
		</ListItemButton>
	</React.Fragment>
);
