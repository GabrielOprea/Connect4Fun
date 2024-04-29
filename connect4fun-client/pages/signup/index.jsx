import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Box,
	Button,
	Container,
	Typography,
	InputAdornment,
	IconButton,
	TextField,
	Paper,
	Grid,
	MenuItem,
	FormGroup,
	FormControlLabel,
	Checkbox,
} from "@mui/material";
import { useRouter } from "next/router";
import styles from "../../styles/LogIn.module.css";
import {AuthenticationService} from "../../service/authentication_service";

export default function SingUp() {
	const router = useRouter();

	const interests = [
		"Football",
		"Basketball",
		"Tennis",
		"Swimming",
		"Running",
		"Cycling",
		"Golf",
		"Volleyball",
		"Soccer",
		"Baseball",
		"Hiking",
		"Table Tennis",
		"Badminton",
		"Boxing",
		"Martial Arts",
		"Ice Skating",
		"Skiing",
		"Board Games",
		"Video Games",
		"Surrfing",
		"Movies",
		"Reading",
		"Karaoke",
		"Picnic",
		"Cooking",
		"Arts and Crafts",
		"Photography",
		"Traveling",
		"Concerts",
		"Dancing",
		"Bowling",
		"Mini Golf",
		"Escape Room",
		"Camping",
		"Fishing",
		"Hiking",
	];

	const [user, setUser] = React.useState({
		firstName: "",
		errorFirstName: false,
		lastName: "",
		errorLastName: false,
		email: "",
		errorEmail: false,
		password: "",
		errorPassword: false,
		confirmPassword: "",
		errorConfirmPassword: false,
		showConfirmPassword: false,
		errorConfirmPassword: false,
		phoneNumber: "",
		errorPhoneNumber: false,
		gender: "",
		errorGender: false,
		location: "",
		errorLocation: false,
		interests: [],
	});

	const uploadedImage = React.useRef(null);
	const imageUploader = React.useRef(null);

	const handleUploadPhoto = (e) => {
		const [file] = e.target.files;
		if (file) {
			const reader = new FileReader();
			const { current } = uploadedImage;
			current.file = file;
			reader.onload = (e) => {
				current.src = e.target.result;
			};
			reader.readAsDataURL(file);
		}
	};

	const handleChangeUserInfo = (fieldName, value) => {
		let newValue = value;

		const firstLetter = fieldName.charAt(0).toUpperCase();
		const restOfWord = fieldName.slice(1);
		const errorFieldName = `error${firstLetter}${restOfWord}`;
		setUser((prevUser) => ({
			...prevUser,
			[errorFieldName]: false,
		}));

		console.log(fieldName);
		if (fieldName === "showConfirmPassword") {
			newValue = !user.showConfirmPassword;
		}

		setUser((prevUser) => ({
			...prevUser,
			[fieldName]: newValue,
		}));
	};

	const handleChangeUserInterest = (interest) => {
		setUser((prevUser) => {
			const isSelected = prevUser.interests.includes(interest);
			if (isSelected) {
				return {
					...prevUser,
					interests: prevUser.interests.filter((item) => item !== interest),
				};
			} else {
				return {
					...prevUser,
					interests: [...prevUser.interests, interest],
				};
			}
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!user.firstName.length) {
			setUser((prevUser) => ({
				...prevUser,
				errorFirstName: true,
			}));
		}

		if (!user.lastName.length) {
			setUser((prevUser) => ({
				...prevUser,
				errorLastName: true,
			}));
		}

		if (!user.password.length) {
			setUser((prevUser) => ({
				...prevUser,
				errorPassword: true,
			}));
		}

		if (!user.confirmPassword.length || user.password != user.confirmPassword) {
			setUser((prevUser) => ({
				...prevUser,
				errorConfirmPassword: true,
			}));
		}

		if (!user.email.length || !/^[^\s]+@[^\s]+\.[^\s]+$/.test(user.email)) {
			setUser((prevUser) => ({
				...prevUser,
				errorEmail: true,
			}));
		}

		if (!user.phoneNumber.length || !/^\+?[0-9]*$/.test(user.phoneNumber)) {
			setUser((prevUser) => ({
				...prevUser,
				errorPhoneNumber: true,
			}));
		}

		if (user.gender === "") {
			setUser((prevUser) => ({
				...prevUser,
				errorGender: true,
			}));
		}

		if (user.location === "") {
			setUser((prevUser) => ({
				...prevUser,
				errorLocation: true,
			}));
		}

		AuthenticationService.registerUser(user);
		router.push("/chat");
	};

	return (
		<Container>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "90%",
					maxWidth: "90%",
					margin: "40px auto 40px auto",
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
						Sign Up
					</Typography>

					<form onSubmit={handleSubmit}>
						<div
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								justifyContent: "center",
								marginBottom: "30px",
							}}
						>
							<input
								type="file"
								accept="image/*"
								onChange={handleUploadPhoto}
								ref={imageUploader}
								style={{
									display: "none",
								}}
							/>
							<div
								style={{
									height: "200px",
									width: "200px",
									border: "1px dashed black",
									borderRadius: "100px",
									marginBottom: "10px",
								}}
								onClick={() => imageUploader.current.click()}
							>
								<img
									ref={uploadedImage}
									style={{
										width: "200px",
										height: "200px",
										borderRadius: "100px",
									}}
								/>
							</div>
							Click to upload profile picture
						</div>
						<Grid container spacing={2} justify="space-between">
							<Grid item xs={6}>
								<TextField
									className={styles.login_component}
									label="First Name"
									variant="outlined"
									onChange={(e) =>
										handleChangeUserInfo("firstName", e.target.value)
									}
									value={user.firstName}
									error={user.errorFirstName}
									helperText={
										user.errorFirstName ? "Please enter your first name." : ""
									}
									fullWidth
								/>
							</Grid>
							<Grid item style={{ marginLeft: "auto" }} xs={6}>
								<TextField
									className={styles.login_component}
									label="Last Name"
									variant="outlined"
									onChange={(e) =>
										handleChangeUserInfo("lastName", e.target.value)
									}
									value={user.lastName}
									error={user.errorLastName}
									helperText={
										user.errorLastName ? "Please enter your last name." : ""
									}
									fullWidth
								/>
							</Grid>
						</Grid>

						<TextField
							className={styles.login_component}
							label="Email"
							variant="outlined"
							onChange={(e) => handleChangeUserInfo("email", e.target.value)}
							value={user.email}
							error={user.errorEmail}
							helperText={
								user.errorEmail ? "Please enter a valid email address." : ""
							}
							fullWidth
						/>
						<Grid container spacing={2} justify="space-between">
							<Grid item xs={6}>
								<TextField
									className={styles.login_component}
									type={"password"}
									label="Password"
									variant="outlined"
									onChange={(e) =>
										handleChangeUserInfo("password", e.target.value)
									}
									value={user.password}
									error={user.errorPassword}
									helperText={
										user.errorPassword ? "Please enter a password." : ""
									}
									fullWidth
								/>
							</Grid>
							<Grid item style={{ marginLeft: "auto" }} xs={6}>
								<TextField
									className={styles.login_component}
									type={user.showConfirmPassword ? "text" : "password"}
									label="Confirm Password"
									variant="outlined"
									InputProps={{
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label="toggle password visibility"
													onClick={(e) =>
														handleChangeUserInfo(
															"showConfirmPassword",
															e.target.value
														)
													}
													edge="end"
												>
													{user.showConfirmPassword ? (
														<Visibility />
													) : (
														<VisibilityOff />
													)}
												</IconButton>
											</InputAdornment>
										),
									}}
									onChange={(e) =>
										handleChangeUserInfo("confirmPassword", e.target.value)
									}
									value={user.confirmPassword}
									error={user.errorConfirmPassword}
									helperText={
										user.errorConfirmPassword
											? "Please confirm your password."
											: ""
									}
									fullWidth
								/>
							</Grid>
						</Grid>

						<TextField
							className={styles.login_component}
							label="Phone Number"
							type="tel"
							value={user.phoneNumber}
							onChange={(e) =>
								handleChangeUserInfo("phoneNumber", e.target.value)
							}
							error={user.errorPhoneNumber}
							helperText={
								user.errorPhoneNumber ? "Please enter your phone number." : ""
							}
							fullWidth
						/>

						<Grid container spacing={2} justify="space-between">
							<Grid item xs={6}>
								<TextField
									className={styles.login_component}
									label="Gender"
									select
									value={user.gender}
									onChange={(e) =>
										handleChangeUserInfo("gender", e.target.value)
									}
									error={user.errorGender}
									helperText={
										user.errorGender ? "Please enter your gender." : ""
									}
									fullWidth
								>
									<MenuItem value="">Select Gender</MenuItem>
									<MenuItem value="male">Male</MenuItem>
									<MenuItem value="female">Female</MenuItem>
									<MenuItem value="other">Other</MenuItem>
								</TextField>
							</Grid>
							<Grid item style={{ marginLeft: "auto" }} xs={6}>
								<TextField
									className={styles.login_component}
									label="Location"
									select
									value={user.location}
									onChange={(e) =>
										handleChangeUserInfo("location", e.target.value)
									}
									error={user.errorLocation}
									placeholder="Enter location"
									helperText={
										user.errorLocation ? "Please enter your location." : ""
									}
									fullWidth
								>
									<MenuItem value="">Select Location</MenuItem>
									<MenuItem value="Bacau">Bacau</MenuItem>
									<MenuItem value="Bacharest">Bacharest</MenuItem>
									<MenuItem value="Cluj">Cluj</MenuItem>
									<MenuItem value="Iasi">Iasi</MenuItem>
									<MenuItem value="Constanta">Constanta</MenuItem>
									<MenuItem value="Other">Other</MenuItem>
								</TextField>
							</Grid>
						</Grid>

						<FormGroup className={styles.login_component}>
							<legend>Please select your interests:</legend>
							<Grid container spacing={0}>
								{interests.map((interest) => (
									<Grid item xs={12} sm={6} md={3} key={interest}>
										<FormControlLabel
											control={
												<Checkbox
													checked={user.interests[interest]}
													onChange={() => handleChangeUserInterest(interest)}
												/>
											}
											label={interest}
										/>
									</Grid>
								))}
							</Grid>
						</FormGroup>
						<Button
							type="submit"
							className={styles.login_component}
							variant="contained"
							sx={{ textTransform: "none", fontSize: "medium" }}
							fullWidth
						>
							Sing Up
						</Button>
					</form>
				</Paper>
			</Box>
		</Container>
	);
}
