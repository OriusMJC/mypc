import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import 'leaflet/dist/leaflet.css'
import style from "../Styles/MapView.module.css";
import "leaflet/dist/leaflet.css";
import MarkersMap from "./MarkersMap";
import { useLocation } from "react-router-dom";

function MapView({ user }) {
	let location = useLocation();
	let users = {
		locals: [],
	};
	if (location.state) {
		users.locals = [location.state];
	}

	if (user) {
		return (
			<div className={style.containerMap}>
				<MapContainer
					center={[
						user[0].latitude,
						user[0].longitude,
					]}
					zoom={13}
					scrollWheelZoom={true}
					style={{ height: "300px", width: "90vw" }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<MarkersMap locals={user} />
				</MapContainer>
			</div>
		);
	}
	if(users.locals.length) {
		return (
			<div className={style.containerMap}>
				{users.locals[0].locals.length === 1 ? (
					<MapContainer
						center={[
							users.locals[0].locals[0].latitude,
							users.locals[0].locals[0].longitude,
						]}
						zoom={13}
						scrollWheelZoom={true}
						style={{ height: "300px", width: "90vw" }}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<MarkersMap locals={users.locals[0].locals} />
					</MapContainer>
				) : (
					<MapContainer
						center={[-38.010992, -57.581316]}
						zoom={4}
						scrollWheelZoom={true}
						style={{ height: "300px", width: "90vw" }}
					>
						<TileLayer
							attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
							url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						/>
						<MarkersMap locals={users.locals[0].locals} />
					</MapContainer>
				)}
			</div>
		);

	}
}

export default MapView;
