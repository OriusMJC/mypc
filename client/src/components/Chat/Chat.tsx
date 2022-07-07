import React, { useEffect, useState } from "react";
import { db as database } from "src/firebase/client";
// import { writeUserData } from 'src/services/userFirebase'
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { useSelector } from "react-redux";

function Chat() {
	let [state, setState] = useState(1);
	let [msg, setMsg] = useState([]);
	let [text, setText] = useState("");
	let user = useSelector((state: any) => state.userDetails);

	// useEffect(() => {
		// if (state !== 1) {
			const starCountRef = ref(database, `chat/`);
			onValue(starCountRef, (snapshot) => {
				console.log(snapshot.val(), "iiiiiiiiiiiiiiiiiiiiiiiiii");
				if(snapshot.val() && snapshot.val().length !== msg.length) {
					const data = snapshot.val();
					setMsg(data);
				}
			});
		// }
	// }, [state]);

	useEffect(() => {
		// if(state !== 1){
		const starCountRef = ref(database, `chat/`);
		onValue(starCountRef, (snapshot) => {
			const data = snapshot.val();
			if(data) {
				setMsg(data);
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
		// writeUserData(state)
		// export let writeUserData = (id) => {
		const db = getDatabase();
		set(ref(db, `chat/${state}`), {
			user: user.name,
			message: text,
		});
		// };
		setState(state + 1);
		setText("");
	};
	// console.log(msg)
	return (
		<div>
			<ul>
				{msg.length > 0 ? (
					msg.map((e, i) => {
						if (e) {
							return (
								<li key={i}>
									{e.user}, {e.message}
								</li>
							);
						}
					})
				) : (
					<li>No tienes mensajes</li>
				)}
			</ul>
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
