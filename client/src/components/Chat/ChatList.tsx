import React, { useEffect, useState } from "react";
import { db as database } from "src/firebase/client";
import { getDatabase, ref, set, child, get, onValue } from "firebase/database";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserData, getUsersById } from "src/redux/actions";
import { useAppDispatch } from "src/config/config";
import styles from "../Styles/ChatList.module.css";

function ChatList() {
	let [list, setList] = useState([]);
	let { userId } = useParams();
	// let userData = useSelector((state:any) => state.)
	let [usersList, setUsersList] = useState([]);
	let dispatch = useAppDispatch();
	let [updateOne, setUpdateOne] = useState(1);
	let usersChats = useSelector((state: any) => state.listUsers);
	// console.log(usersChats)

	let getUsersInfo = () => {
		if (list.length) {
			let users = list.map((e) => {
				// console.log(list, e)
				if (e.users[0] !== userId) {
					return e.users[0];
					// getUserData(e.users[0])
				} else if (e.users[1] !== userId) {
					return e.users[1];
				}
			});
			console.log(users, "USERS", list);
			if (users) {
				setUsersList(users);
        console.log("Se manda")
        dispatch(getUsersById(users))
				setUpdateOne(0);
			}
		}
	};

	useEffect(() => {
    getUsersInfo();
		
	}, [list]);
	// if(usersList.length) {

	// }

	// console.log("hola")

	useEffect(() => {
		let starCountRef = ref(database, `chat/`);
		onValue(starCountRef, (snapshot) => {
      let data = snapshot.val();
			if (data) {
        let newList = data.filter((e) => e.users.includes(userId));
				if (newList.length) {
          // console.log(newList)
					setList(newList);
				}
			} else {
      }
		});
		return setUpdateOne(1);
	}, []);

	// useEffect(() => {
	//   if(updateOne === 1) {
	//   }
	// }, [updateOne])

	// console.log(usersChats, "chats");

	return (
		<div>
			<ul className={styles.containerChatList}>
				{usersChats.length
					? usersChats.map((e) => (
							<Link to={`/chat/${userId}/e.id`}>
								<li>
									<img src={e.avatar} alt="" />
									<h1>{e.name}</h1>
									<h4>{e.email}</h4>
								</li>
							</Link>
					  ))
					: null}
			</ul>
		</div>
	);
}

export default ChatList;
