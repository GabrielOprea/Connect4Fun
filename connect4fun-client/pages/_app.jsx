import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { CacheProvider } from "@emotion/react";
import theme from "../config/theme";
import createEmotionCache from "../config/createEmotionCache";
import Layout from "../layouts/";
import Background from "../components/Background";
import "../styles/global.css";

const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
	const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<title>Connect4Fun</title>
				<meta
					name="description"
					content="The app aims to connect of individuals passionate about various activities."
				/>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Background />
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</ThemeProvider>
		</CacheProvider>
	);
}
