import React from "react";
import { Container, Typography } from "@mui/material";

export default function Footer() {
	return (
		<footer>
			<Container>
				<Typography variant="body2" color="textSecondary" align="center">
					&copy; {new Date().getFullYear()} Connect4Fun. All rights reserved.
				</Typography>
			</Container>
		</footer>
	);
}
