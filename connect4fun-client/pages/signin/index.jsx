import React, {useEffect, useState} from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	Link,
	Typography,
	InputAdornment,
	IconButton,
	TextField,
	Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../styles/LogIn.module.css";
import {AuthenticationService} from "../../service/authentication_service";

export default function SingIn() {
	const router = useRouter();
	const [username, setUsername] = React.useState("");
	const [usernameError, setUsernameError] = React.useState(false);
	const [password, setPassword] = React.useState("");
	const [passwordError, setPasswordError] = React.useState(false);
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleClickForgotPassword = (e) => {
		e.preventDefault();
		router.push("/forgot-password");
	};

	const handleSingUp = (e) => {
		e.preventDefault();
		router.push("/signup");
	};

	const handleChangeUsername = (e) => {
		setUsername(e.target.value);
		setUsernameError(false);
	};

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
		setPasswordError(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setUsernameError(false);
		setPasswordError(false);

		if (!password.length) {
			setPasswordError(true);
		}

		if (!username.length) {
			setUsernameError(true);
			return;
		}

		// if (!/^[^\s]+@[^\s]+\.[^\s]+$/.test(username)) {
		// 	setUsernameError(true);
		// }

		AuthenticationService.loginUser(username, password);
		router.push("/chat");
	};

	return (
		<Container>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "90vh",
				}}
			>
				<Paper className={styles.login_card} elevation={3}>
					<Typography
						className={styles.login_component}
						variant="h4"
						component="h1"
						align="center"
						sx={{ fontWeight: "bold" }}
					>
						Log In
					</Typography>

					<form onSubmit={handleSubmit}>
						<TextField
							className={styles.login_component}
							label="Username"
							variant="outlined"
							onChange={handleChangeUsername}
							value={username}
							error={usernameError}
							helperText={
								usernameError ? "Please enter a valid username." : ""
							}
							fullWidth
						/>
						<TextField
							className={styles.login_component}
							type={showPassword ? "text" : "password"}
							label="Password"
							variant="outlined"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											edge="end"
										>
											{showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							onChange={handleChangePassword}
							value={password}
							error={passwordError}
							helperText={passwordError ? "Please enter a password." : ""}
							fullWidth
						/>
						<Typography className={styles.login_component} align="center">
							<Link
								component="button"
								underline="none"
								onClick={handleClickForgotPassword}
								sx={{ align: "center" }}
							>
								Forgot password?
							</Link>
						</Typography>
						<Button
							type="submit"
							className={styles.login_component}
							variant="contained"
							sx={{ textTransform: "none", fontSize: "medium" }}
							fullWidth
						>
							Log In
						</Button>
						<Typography className={styles.login_component} align="center">
							Don&rsquo;t have an account?{" "}
							<Link component="button" underline="none" onClick={handleSingUp}>
								{" "}
								Sing Up{" "}
							</Link>
						</Typography>
					</form>
				</Paper>
			</Box>
		</Container>
	);
}
