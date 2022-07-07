import React, { useEffect, useState } from "react";
import { db as database } from "src/firebase/client";
// import styles from '../Styles/Chat.modules.css';
import styles from "../Styles/Chat.module.css";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function Chat() {
	let { from, to } = useParams();
	console.log(`from ${from}, to ${to}`);
	// let [state, setState] = useState(1);
	let [chatId, setChatId] = useState(0);
	let [chat, setChat] = useState([]);
	let [msg, setMsg] = useState([]);
	let [text, setText] = useState("");
	let user = useSelector((state: any) => state.userDetails);
	const db = getDatabase();

	// useEffect(() => {
	// if (state !== 1) {
	const starCountRef = ref(database, `chat/`);
	onValue(starCountRef, (snapshot) => {
		// console.log(snapshot.val(), "iiiiiiiiiiiiiiiiiiiiiiiiii");
		if (snapshot.val() && snapshot.val().length !== msg.length) {
			const data = snapshot.val();
			setMsg(data);
		}
	});
	// }
	// }, [state]);

	console.log("====================", chat, `=================`);
	useEffect(() => {
		// if(state !== 1){
		const starCountRef = ref(database, `chat/`);
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			console.log(data, "DATA");
			if (data) {
				let chatUser = data.filter(
					(e, i) => {
						// console.log(e)
						if(e.users.includes(user.id) && e.users.includes(to))
						setChatId(i);
						return e;
					});
					// console.log(chatUser)
				if (chatUser) {
					setChat(chatUser);
				}
			} else {
				// console.log("no existe y entra");
				// const db = getDatabase();
				set(ref(db, `chat/${0}`), {
					users: [from, to],
					messages: [""],
				});
			}
		});
		// }
	}, []);

	// let handleFunction = () => {
	// }
	let handleChange = (event) => {
		setText(event.target.value);
	};
	let handleSubmit = (event) => {
		event.preventDefault();
		if( typeof chat[0].messages[0] === "string") {
			chat[0].messages[0] = {
				user: user.name,
				msg: text,
			}
		} else {
			// const db = getDatabase();
			chat[0].messages.push({
				user: user.name,
				msg: text,
			})
		}
		set(ref(db, `chat/${chatId}`), {
			users: [...chat[0].users],
			messages: [...chat[0].messages]
		});
		// setState(state + 1);
		setText("");
	};
	// console.log(chat, "================================")
	return (
		<div className={styles.containerChat}>
			<div>
				<ul>
					{chat.length > 0 ? (
						chat[0].messages.map((e, i) => {
							if (e) {
								return (
									<li key={i}>
										{e.user}, {e.msg}
									</li>
								);
							}
						})
					) : (
						<li>No tienes mensajes</li>
					)}
				</ul>
			</div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={text}
					onChange={(event) => handleChange(event)}
				/>
				<button type="submit">Enviar</button>
			</form>
		</div>
	);
}

export default Chat;
