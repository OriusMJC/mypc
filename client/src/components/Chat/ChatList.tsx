import React, { useEffect, useState } from "react";
import { db as database } from "src/firebase/client";
import { ref, onValue } from "firebase/database";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUsersById } from "src/redux/actions";
import { useAppDispatch } from "src/config/config";
import styles from "../Styles/ChatList.module.css";

function ChatList() {
	let [list, setList] = useState([]);
	let { userId } = useParams();
	let dispatch = useAppDispatch();
	let usersChats = useSelector((state: any) => state.listUsers);

	let getUsersInfo = () => {
		if (list.length) {
			let users = list.map((e) => {
				if (e.users[0] !== userId) {
					return e.users[0];
				} else if (e.users[1] !== userId) {
					return e.users[1];
				}
			});
			if (users) {
        dispatch(getUsersById(users))
			}
		}
	};

	useEffect(() => {
    getUsersInfo();
	}, [list]);

	useEffect(() => {
		let starCountRef = ref(database, `chat/`);
		onValue(starCountRef, (snapshot) => {
      let data = snapshot.val();
			if (data) {
        let newList = data.filter((e) => e.users.includes(userId));
				if (newList.length) {
					setList(newList);
				}
			} else {
      }
		});
	}, []);

	return (
		<div className={styles.containerChatList}>
			<Link to='/user/detail'>
				<button>
					Volver
				</button>
			</Link>
			<ul className={styles.containerChatList}>
				{usersChats.length
					? usersChats.map((e) => (
							<Link to={`/chat/${userId}/${e?.id}`}>
								<li>
									<img src={e?.avatar} alt="" />
									<div>
										<h1>{e?.name}</h1>
										<h4>{e?.email}</h4>
									</div>
								</li>
							</Link>
					  ))
					: null}
			</ul>
		</div>
	);
}

export default ChatList;
