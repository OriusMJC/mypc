import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch } from "src/config/config";
import { editUserData, getUserData } from "src/redux/actions";
import Loading from "../Loading/Loading";
import MapView from "../Map/MapView";
import { Link } from "react-router-dom";
import s from "../Styles/Direction.module.css";
import satellite from "../../media/satellite.png";
import location from "../../media/location.png";
import L from 'leaflet';
import { useMapEvents } from 'react-leaflet'
import iconM from '../../media/logo1.png'


// const icon = L.icon({
//   iconSize: [25, 41],
//   iconAnchor: [10, 41],
//   popupAnchor: [2, -40],
//   iconUrl: iconM,
//   // shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
// });

// function MyComponent({ saveMarkers }) {
//   const map = useMapEvents({
//     click: (e) => {
//       const { lat, lng } = e.latlng;
//       L.marker([lat, lng], { icon }).addTo(map);
//       saveMarkers([lat, lng]);
//     }
//   });
//   return null;
// }

function Direction() {
	let dispatch = useAppDispatch();
	const spanish = useSelector((state: any) => state.spanish);
	let [options, setOptions] = useState({
		automatic: false,
		manual: false,
	});
	let user = useSelector((state: any) => state.userDetails);
	let [position, setPosition] = useState([])
  let navigate = useNavigate()

	let positionAutomatic = () => {
		if (user) {
			if (!user.latitude && !user.altitude && !options.automatic) {
				navigator.geolocation.getCurrentPosition(
					function (position) {
						let newData = {
							...user,
							longitude: `${position.coords.longitude}`,
							latitude: `${position.coords.latitude}`,
							seller: true,
						};
						dispatch(editUserData(user.id, newData));
						setOptions({automatic: true, manual: false})
						navigate("/user/createProduct")
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
	}

	
	let positionManually = () => {
		setOptions({automatic: false, manual: true})
	}
	let coordUser = (latitude, longitude) => {
		setPosition([latitude, longitude])
	}
	let sendCoordUser = async () => {
		let newData = {
			...user,
			longitude: `${position[1]}`,
			latitude: `${position[0]}`,
			seller: true,
		};
		await dispatch(editUserData(user.id, newData));
		navigate("/user/createProduct")
	}
	useEffect(() => {
	}, [user]);

	if(user) {
		console.log(position)
		if(user.id && user.seller && user.latitude && user.longitude) {
			return (
				<>
					<div className={s.directionContainer}>
						<h1>{spanish ? "Tu localización" : "Your location"}</h1>
						<MapView user={[user]} manually={false} />
					</div>
				</>
			)
		} else if (!options.automatic && !options.manual) {
			return (
				<div className={s.optionsContainer}>
					<h3 className={s.title}>
					{spanish ? "¿Cómo quieres mostrar tu ubicación?" : "How would you like to show your location?"}
					</h3>
					<div className={s.options} onClick={positionAutomatic}>
							<div className={s.card}>
								<div className={`${s.faceFront} ${s.face}`}>
									<h3>{spanish ? "Automático" : "Automatic"}</h3>
									<i className="fa-solid fa-satellite"></i>
								</div>
								<div className={`${s.faceBack} ${s.face}`}>
									<p>{spanish ? "Debes permitir tu ubicación al navegador. ¡Los datos se tomarán automáticamente!" : "You must allow your location to the browser. The data will be taken automatically!"}</p>
								</div>
							</div>
					</div>
					<h5>{spanish ? "Ó" : "Or"}</h5>
					<div className={s.options}>
						{/* <Link to="/"> */}
							<div className={s.card} onClick={positionManually}>
								<div className={`${s.faceFront} ${s.face}`}>
									<h3>Manual</h3>
									<i className="fa-solid fa-map-location-dot"></i>
								</div>
								<div className={`${s.faceBack} ${s.face}`}>
									<p>{spanish ? "Debes marcar la ubicación de tu tienda en el mapa" : "You must mark the location of your store on the map"}</p>
								</div>
							</div>
					</div>
				</div>
			)
		} else if (!options.automatic && options.manual) {
			return (
				<>
				<div className={s.directionContainer}>
					<h1>{spanish ? "Tu localización" : "Your location"}</h1>
					{
						position.length ? <button onClick={sendCoordUser}>Listo</button> : null
					}
					<MapView user={[user]} manually={[true, coordUser]}/>
				</div>
			</>
			)
		}
	} else {
		return null
	}
}

export default Direction;
