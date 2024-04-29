import React from "react";
import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Footer from "../components/Footer";

export default function Home() {
	const router = useRouter();

	return (
		<Container disableGutters maxWidth={false}>
			<Box
				sx={{
					minHeight: "90vh",
					width: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<img
					className="background_img"
					src="background.jpg"
					alt="Background Home page."
				/>
				<Grid
					container
					spacing={4}
					sx={{
						height: "fit-content",
						padding: "10px 10px 10px 10px",
						marginTop: "40px",
					}}
				>
					<Grid item xs={4}>
						<Paper elevation={3} align="center">
							<Typography fontSize="40px">
								<span style={{ color: "#606ccc" }}>
									<strong>10,000+</strong>
								</span>
								<br></br>
								<span>
									<strong>users</strong>
								</span>
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper elevation={3} align="center">
							<Typography fontSize="40px">
								<span style={{ color: "#606ccc" }}>
									<strong>365,100+</strong>
								</span>
								<br></br>
								<span>
									<strong>conversations</strong>
								</span>
							</Typography>
						</Paper>
					</Grid>
					<Grid item xs={4}>
						<Paper elevation={3} align="center">
							<Typography fontSize="40px">
								<span style={{ color: "#606ccc" }}>
									<strong>2,500+</strong>
								</span>
								<br></br>
								<span>
									<strong>events</strong>
								</span>
							</Typography>
						</Paper>
					</Grid>
				</Grid>
				<Paper
					sx={{
						height: "fit-content",
						padding: "50px 30px 50px 30px",
						margin: "40px 10px 40px 10px",
					}}
					elevation={3}
				>
					<Box align="center">
						<p>
							<strong>
								Connect
								<span style={{ color: "#fcad03" }}>4</span>
								Fun
							</strong>{" "}
							is a dynamic and inclusive app designed to bring together
							individuals who share a passion for various activities, creating a
							vibrant community of like-minded enthusiasts. Whether you&rsquo;re
							into football, gaming, travel, or any other exciting pursuits,
							Connect4Fun provides a platform where individuals can connect,
							share experiences, and forge meaningful connections. With
							Connect4Fun, finding fellow enthusiasts has never been easier.
						</p>

						<p>
							Explore a diverse range of activities, create and join events, and
							engage in conversations with people who share your interests.
							<strong>
								Connect
								<span style={{ color: "#fcad03" }}>4</span>
								Fun
							</strong>{" "}
							is more than just an app; it&rsquo;s a gateway to discovering new
							friendships, expanding your network, and creating unforgettable
							memories.
						</p>

						<img
							className="activities_img"
							src="activities.jpg"
							alt="Activities image."
						/>

						<p>
							Join{" "}
							<strong>
								Connect
								<span style={{ color: "#fcad03" }}>4</span>
								Fun
							</strong>{" "}
							today and embark on a journey of connecting with individuals who
							share your zest for life. It&rsquo;s time to turn your passions
							into unforgettable experiences and build a community that
							celebrates the joy of shared interests.
						</p>
					</Box>
				</Paper>
				<Footer></Footer>
			</Box>
		</Container>
	);
}
