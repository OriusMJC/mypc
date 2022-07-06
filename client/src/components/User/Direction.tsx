import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { editUserData, getUserData } from "src/redux/actions";
import MapView from "../Map/MapView";

function Direction() {
	let dispatch = useAppDispatch();

	let user = useSelector((state: any) => state.userDetails);
	useEffect(() => {
		if (user) {
			if (!user.latitude && !user.altitude) {
				navigator.geolocation.getCurrentPosition(
					function (position) {
						// console.log(position);
						let newData = {
							...user,
							longitude: `${position.coords.longitude}`,
							latitude: `${position.coords.latitude}`,
						};
						dispatch(editUserData(user.id, newData));
						dispatch(getUserData(user.id));
					},
					function (error) {
						console.error("Error Code = " + error.code + " - " + error.message);
					},
					{
						enableHighAccuracy: true,
					}
				);
			}
		}
	}, [user]);

	return (
		<div>
			<MapView user={[user]} />
		</div>
	);
}

export default Direction;
