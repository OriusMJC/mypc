// import { useState } from 'react';
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { updateEmailUser, updatePasswordUser } from "src/services/userFirebase";
import styles from "../Styles/UserEditPasswordOrMail.module.css";

export default function UserEditData() {
	const user = useSelector((state: any) => state.userDetails);
	const location = useLocation();
	const dispatch = useAppDispatch()
	let [newEmail, setNewEmail] = useState(user.email);
	let handleChanges = (event) => {
		setNewEmail(event.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (location.pathname === "/user/detail/password") {
			await updatePasswordUser(user.email);
		} else {
			await updateEmailUser(user.id, newEmail, dispatch);
		}
	};

	if (location.pathname === "/user/detail/password") {
		return (
			<div className={styles.containerEdit}>
				<form onSubmit={handleSubmit}>
					<div className={styles.containerInputs}>
						<p>A link will be sent to your email to change your password</p>
						<button type="submit">Change Password</button>
					</div>
				</form>
			</div>
		);
	} else {
		return (
			<div className={styles.containerEdit}>
				<form onSubmit={handleSubmit}>
					<div className={styles.containerInputs}>
						<input
							name="newMail"
							type="text"
							placeholder="Write your new email"
							defaultValue={newEmail}
							onChange={(event) => handleChanges(event)}
						/>
						<button type="submit">Change Email</button>
					</div>
				</form>
			</div>
		);
	}
}
