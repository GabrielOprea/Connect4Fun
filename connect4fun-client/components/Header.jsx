import React from "react";
import {
	AppBar,
	IconButton,
	Avatar,
	Container,
	Toolbar,
	Typography,
	Link,
	Button,
	Box,
	ButtonGroup,
} from "@mui/material";
import { useRouter } from "next/router";
import {AuthenticationService} from "../service/authentication_service";

export default function SimpleHeader() {
	const router = useRouter();
	const isHomePage = router.pathname === "/";
	const isChat = router.pathname === "/chat";

	const handleClickLogo = (e) => {
		e.preventDefault();
		router.push("/");
	};

	const logout = () => {
		AuthenticationService.logoutUser();
		router.push("/")
	}

	return (
		<AppBar position="static" sx={{ height: "fit-content" }}>
			<Container maxWidth="xl">
				<Toolbar
					disableGutters
					sx={{ display: "flex", justifyContent: "space-between" }}
				>
					<Box
						sx={{ display: "flex", alignItems: "center" }}
						onClick={handleClickLogo}
					>
						<IconButton sx={{ p: 0, mr: 2 }}>
							<Avatar alt="Connect4Fun Logo" src="logo.png" />
						</IconButton>
						<Typography>
							<strong>
								<span style={{ color: "#ffffff" }}>Connect</span>
								<span style={{ color: "#fcad03" }}>4</span>
								<span style={{ color: "#ffffff" }}>Fun</span>
							</strong>
						</Typography>
					</Box>

					{isHomePage && (
						<div>
							<Link key={0} href="/signin" passHref>
								<Button
									color="secondary"
									sx={{
										background: "white",
										border: "2px solid",
										width: "100px",
										borderRadius: "20px",
									}}
								>
									Log In
								</Button>
							</Link>
							<Link key={1} href="/signup" passHref>
								<Button
									color="secondary"
									sx={{
										background: "white",
										border: "2px solid",
										width: "100px",
										marginLeft: "10px",
										borderRadius: "20px",
									}}
								>
									Sign Up
								</Button>
							</Link>
						</div>
					)}
					{isChat && (
						<div>
								<Button onClick={logout}
									color="secondary"
									sx={{
										background: "white",
										border: "2px solid",
										width: "100px",
										marginLeft: "10px",
										borderRadius: "20px",
									}}
								>
									Log Out
								</Button>
						</div>
					)

					}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
