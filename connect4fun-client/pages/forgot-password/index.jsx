import React from "react";
import {
	Box,
	Button,
	Container,
	Link,
	Typography,
	TextField,
	Paper,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../styles/LogIn.module.css";

export default function ForgotPassword() {
	const router = useRouter();

	const [email, setEmail] = React.useState("");
	const [emailError, setEmailError] = React.useState(false);

	const handleChangeEmail = (e) => {
		setEmail(e.target.value);
		setEmailError(false);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		setEmailError(false);

		if (!email.length || !/^[^\s]+@[^\s]+\.[^\s]+$/.test(email)) {
			setEmailError(true);
			return;
		}

		router.push("/reset-password");
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
						Forgot your password
					</Typography>

					<Typography className={styles.login_component}>
						Please enter the email address you would like your password reset
						information to be sent to
					</Typography>

					<form onSubmit={handleSubmit}>
						<TextField
							className={styles.login_component}
							label="Email"
							variant="outlined"
							onChange={handleChangeEmail}
							value={email}
							error={emailError}
							helperText={
								emailError ? "Please enter a valid email address." : ""
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
							Request reset password
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
