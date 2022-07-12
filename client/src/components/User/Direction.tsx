import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { editUserData, getUserData } from "src/redux/actions";
import Loading from "../Loading/Loading";
import MapView from "../Map/MapView";
import s from '../Styles/Direction.module.css'

function Direction() {
	let dispatch = useAppDispatch();
	const spanish = useSelector((state: any) => state.spanish);

	let user = useSelector((state: any) => state.userDetails);
	useEffect(() => {
		if (user) {
			if (!user.latitude && !user.altitude) {
				navigator.geolocation.getCurrentPosition(
					function (position) {
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
		<>
		{
			user.id?
			<div className={s.directionContainer}>
				<h1>{spanish ? "Tu localización" : "Your location"}</h1>
				<MapView user={[user]} />
			</div>
			:
			<Loading load={spanish ? 'Buscando tu localización...' : "Searching your location..."} msgError={spanish ?'No hemos podido encontrar tu localización' : "We couldn't find your location"} time={3000}/>
		}
		</>
	);
}

export default Direction;
