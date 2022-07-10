import React, { useEffect, useState } from "react";
import { db as database } from "src/firebase/client";
import styles from "../Styles/Chat.module.css";
import { ref, set, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { Link, useLocation, useParams } from "react-router-dom";

function Chat() {
	let { from, to } = useParams();
	let { state } = useLocation();
	let [chatId, setChatId] = useState(null);
	let [chat, setChat] = useState({
		messages: [{ user: "", message: "", id: ""}],
		users: [],
	});

	let [text, setText] = useState("");

	let user = useSelector((state: any) => state.userDetails);
	const starCountRef = ref(
		database,
		`chat${state ? `/${state[0].chatId}` : `/`}`
	);

	let handleChange = (event) => {
		setText(event.target.value);
	};
	let handleSubmit = (event) => {
		event.preventDefault();
		if (chat.messages.length && typeof chat.messages[0] === "string") {
			set(
				ref(database, `chat${state ? `/${state[0].chatId}` : `/${chatId}`}`),
				{
					users: [...chat.users],
					messages: [{ user: user.name, message: text, id: user.id }],
				}
			);
		} else {
			let newChat = chat;
			newChat.messages.push({
				message: text,
				user: user.name,
				id: user.id,
			});
			set(
				ref(database, `chat${state ? `/${state[0].chatId}` : `/${chatId}`}`),
				{
					users: [...chat.users],
					messages: [...newChat.messages],
				}
			);
		}
		setText("");
	};

	useEffect(() => {
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			if (state) {
				setChat(data);
			} else if (!state && !chatId && chatId !== 0) {
				for (let i = 0; i < data.length; i++) {
					if (data[i].users.includes(from) && data[i].users.includes(to)) {
						setChat(data[i]);
						setChatId(i);
					}
				}
			}
		});
	}, []);
console.log(user.id ,chat)
	return (
		<div className={styles.containerChat}>
			<Link to={`/list/chats/${user.id}`}>
				<button>Volver</button>
			</Link>
			<div className={styles.containerMessages}>
				<ul>
					{chat?.messages[0].message ? (
						chat.messages.map((e, i) => {
							if (e) {
								return (
									<li key={i} className={user.id === e.id ? styles.from : styles.to}>
										<div>
										{e.message}

										</div>
									</li>
								);
							}
						})
					) : (
						<li>No tienes mensajes</li>
					)}
				</ul>
			</div>
			<form onSubmit={handleSubmit} id={styles.inputMsg}>
				<input
					type="text"
					value={text}
					onChange={(event) => handleChange(event)}
				/>
				<button type="submit"><i className="fa-solid fa-paper-plane"></i></button>
			</form>
		</div>
	);
}

export default Chat;
