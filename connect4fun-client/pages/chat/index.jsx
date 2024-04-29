import React, {useEffect, useState} from "react";
import {
	Box,
	Button,
	Container,
	Typography,
	Paper,
	TextField,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText
} from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useRouter } from "next/router";
import {UserService} from "../../service/user_service";
import {AuthenticationService} from "../../service/authentication_service";
import {ConversationService} from "../../service/conversation_service";
import {MessageService} from "../../service/message_service";

export default function Chat() {
	const router = useRouter();

	const [conversations, setConversations] = useState([]);
	const [userConversations, setUserConversations] = useState([]);
	const [messagesBack, setMessagesBack] = useState([]);
	const [messagesConversation, setMessagesConversation] = useState([]);

	const [currentConversation, setCurrentConversation] = useState("");
	const [messages, setMessages] = useState([]);
	const [newMessage, setNewMessage] = useState("");
	const [user, setuser] = useState([]);
	const currentUserId = AuthenticationService.getUserID();

	const users = [
		{ id: 1, name: "ana123" },
		{ id: 2, name: "george_turcu" },
		{ id: 3, name: "cosmin2000" },
	];

	const groups = [
		{ id: 1, name: "Footbal" },
		{ id: 2, name: "Gaming" },
	];

	const handleConversationClick = (conv) => {
		setCurrentConversation(conv);
		console.log(conv)
		const currentMessages = [];
		for (const msg of messagesBack) {
			const ConversationID = msg.fields.ConversationID;

			if (conv.pk == ConversationID) {
				currentMessages.push(msg)
			}
		}

		const chatMessages = [];
		const otherUserID = conv.fields.ConversationUser.pk
		for (let i = 0; i < currentMessages.length; i++) {

			const chatMsg = {
				id: i,
				text: currentMessages[i].fields.Content,
				sender: (i % 2 == 0)? currentUserId : otherUserID
			}
			chatMessages.push(chatMsg)
		}

		setMessages(chatMessages);
	};

	const handleSendMessage = () => {
		if (newMessage.trim() === "") return;

		const newMessageObj = {
			id: messages.length + 1,
			text: newMessage,
			sender: 1,
		};

		setMessages([...messages, newMessageObj]);
		setNewMessage("");
	};

	useEffect(() => {
		try {
			async function getConversations() {
				const response = await ConversationService.getAllConversations();
				setConversations(response);
				const filter = [];

				for (const conversation of conversations) {
					const Users = conversation.fields.Users;
					if (Users.find(i => (i == currentUserId))) {
						filter.push(conversation);
						for (const i of Users) {
							if (i != currentUserId) {
								const tempUser = await UserService.getUserById(i);
								conversation.fields["ConversationUser"] = tempUser;

							}
						}
					}
				}
				setUserConversations(filter);
			}
			getConversations();
		} catch (e) {
			console.log(e);
		}

	}, []);

	useEffect(() => {
		try {
			async function getMessages() {
				const response = await MessageService.getAllMessages();
				setMessagesBack(response);

			}
			getMessages();
		} catch (e) {
			console.log(e);
		}

	}, []);

	return (
		<Container disableGutters maxWidth={false}>
			<Box
				style={{
					height: "90vh",
					width: "100%",
					display: "flex",
					alignItems: "center",
					flexDirection: "column",
				}}
			>
				<Paper
					style={{
						height: "90%",
						width: "90%",
						display: "flex",
						margin: "40px 10px 40px 10px",
					}}
					elevation={3}
				>
					<div style={{ flex: "1" }}>

						<div
							style={{
								height: "100%",
								overflowY: "auto",
								padding: "0px 10px 10px 10px",
							}}
						>
							<Typography
								variant="h3"
								color="#606ccc"
								style={{
									padding: "10px 30px 10px 30px",
								}}
							>
								<strong>Chats</strong>
							</Typography>
							<List style={{}}>
								{userConversations.map((conversation) => (
									<ListItem disablePadding>
										<ListItemButton
											key={conversation.pk}
											onClick={() => handleConversationClick(conversation)}
											style={{
												border: "1px solid #ccc",
												padding: "10px 30px 10px 30px",
											}}
										>
											<ListItemIcon>
												<PersonOutlineIcon />
											</ListItemIcon>
											<ListItemText primary={conversation.fields.ConversationUser[0].fields.Username} />
										</ListItemButton>
									</ListItem>
								))}
							</List>
						</div>
					</div>
					<div
						style={{
							flex: 3,
							padding: "10px 10px 10px 10px",
							height: "100%",
							overflowY: "auto",
						}}
					>
						{currentConversation ? (
							<>
								<Typography
									variant="h3"
									color="#fcad03"
									align="center"
									style={{
										padding: "10px 30px 10px 30px",
									}}
								>
									{currentConversation.fields.ConversationUser[0].fields.Username}
								</Typography>

								<div
									style={{
										display: "flex",
										flexDirection: "column",
										gap: "10px",
										border: "1px solid #ccc",
										paddingBottom: "10px",
										height: "70%",
										borderRadius: "5px",
									}}
								>
									{messages.map((message) => (
										<div
											key={message.id}
											style={{
												display: "flex",
												flexDirection: "column",
												paddingLeft: "10px",
												paddingRight: "10px",
												alignItems:
													message.sender === currentUserId ? "flex-end" : "flex-start",
											}}
										>
											<div style={{ textAlign: "center", marginBottom: "5px" }}>
												{message.sender === currentUserId
													? "You"
													: currentConversation.fields.ConversationUser[0].fields.Username}
											</div>
											<Paper
												elevation={3}
												style={{
													minWidth: "40%",
													padding: "10px",
													maxWidth: "70%",
													backgroundColor:
														message.sender === currentUserId
															? "#fcad03"
															: "#606ccc",
													color: "white",
												}}
											>
												{message.text}
											</Paper>
										</div>
									))}
								</div>

								<div
									style={{
										display: "flex",
										alignItems: "center",
										marginTop: "10px",
										backgroundColor: "#f0f0f0",
										padding: "10px",
										borderRadius: "5px",
									}}
								>
									<TextField
										type="text"
										value={newMessage}
										onChange={(e) => setNewMessage(e.target.value)}
										placeholder="Type your message..."
										style={{ flex: 4, marginRight: "10px" }}
									/>
									<Button
										variant="contained"
										color="primary"
										style={{ flex: 1 }}
										onClick={handleSendMessage}
									>
										Send
									</Button>
								</div>
							</>
						) : (
							<p>Select a user to start chatting.</p>
						)}
					</div>
				</Paper>
			</Box>
		</Container>
	);
}
