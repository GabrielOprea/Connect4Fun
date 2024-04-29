import React from "react";
import {
	Box,
	Button,
	Container,
	Link,
	Typography,
	TextField,
	InputAdornment,
	IconButton,
	Paper,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useRouter } from "next/router";
import styles from "../../styles/LogIn.module.css";

export default function ForgotPassword() {
	const router = useRouter();

	const [password, setPassword] = React.useState("");
	const [passwordError, setPasswordError] = React.useState(false);
	const [confirmPassword, setConfirmPassword] = React.useState("");
	const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

	const handleChangePassword = (e) => {
		setPassword(e.target.value);
		setPasswordError(false);
	};

	const handleChangeConfirmPassword = (e) => {
		setConfirmPassword(e.target.value);
		setConfirmPasswordError(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!password.length) {
			setPasswordError(true);
		}

		if (!confirmPassword.length || password != confirmPassword) {
			setConfirmPasswordError(true);
			return;
		}

		router.push("/");
	};

	return (
		<Container>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					alignSelf: "center",
					height: "90vh",
				}}
			>
				<Paper
					className={styles.login_card}
					elevation={3}
					sx={{ width: "60%" }}
				>
					<Typography
						className={styles.login_component}
						variant="h4"
						component="h1"
						align="center"
						sx={{ fontWeight: "bold" }}
					>
						Reset your password
					</Typography>

					<Typography className={styles.login_component}>
						Please enter your new password
					</Typography>

					<form onSubmit={handleSubmit}>
						<TextField
							className={styles.login_component}
							type={"password"}
							label="New Password"
							variant="outlined"
							onChange={handleChangePassword}
							value={password}
							error={passwordError}
							helperText={
								passwordError ? "Please enter your new password." : ""
							}
							fullWidth
						/>
						<TextField
							className={styles.login_component}
							type={showConfirmPassword ? "text" : "password"}
							label="Confirm New Password"
							variant="outlined"
							InputProps={{
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => {
												setShowConfirmPassword(!showConfirmPassword);
											}}
											edge="end"
										>
											{showConfirmPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								),
							}}
							onChange={handleChangeConfirmPassword}
							value={confirmPassword}
							error={confirmPasswordError}
							helperText={
								confirmPasswordError ? "Please confirm your new password." : ""
							}
							fullWidth
						/>
						<Button
							type="submit"
							className={styles.login_component}
							variant="contained"
							sx={{ textTransform: "none", fontSize: "medium" }}
							onClick={handleSubmit}
							fullWidth
						>
							Reset password
						</Button>
						<Link key={3} href="/" passHref>
							<Button
								color="secondary"
								variant="outlined"
								sx={{ textTransform: "none", fontSize: "medium" }}
								fullWidth
							>
								Go back home
							</Button>
						</Link>
					</form>
				</Paper>
			</Box>
		</Container>
	);
}
