import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";
// import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import style from "../Styles/MapView.module.css";
import "leaflet/dist/leaflet.css";
import MarkersMap from "./MarkersMap";
import { useLocation } from "react-router-dom";
import { MarkerLocationIcon } from './MarkerLocationIcon'

function MapView({ user, manually }) {
	let location = useLocation();
	let users = {
		locals: [],
	};
	if (location.state) {
		users.locals = [location.state];
	}
	let [coord, setCoord] = useState([])

	function MyComponent({ setMarkers }) {
		const map = useMapEvents({
			click: (e) => {
				const { lat, lng } = e.latlng;
				setCoord([lat, lng])
				manually[1](lat, lng)
				// console.log(lat, lng);
				// return <MarkersMap locals={[{latitude: lat, longitude: lng}]} />
				// L.marker([lat, lng], {MarkerLocationIcon}).addTo(map);
				// return <Marker position={[lat, lng]} icon={MarkerLocationIcon}>
     			
    		// </Marker>
				// setMarkers([lat, lng]);
			}
		});
		return null;
	}

	if (user) {
		const centerMap = user[0].seller ? [
			user[0].latitude,
			user[0].longitude,
		] : [-37.99515924615389, -57.554217402443584]
		const zoomMap = user[0].seller ? 13 : 3

		return (
			<div className={style.containerMap}>
				<MapContainer
					center={[centerMap[0], centerMap[1]]}
					zoom={zoomMap}
					scrollWheelZoom={true}
					style={{ height: "300px", width: "90vw" }}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{
						manually[0] ? <MyComponent setMarkers={"setMarkers"}/> : <MarkersMap locals={user} />
					}
					{
						coord.length ? <Marker position={[coord[0], coord[1]]} icon={MarkerLocationIcon}/> : null
					}

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
