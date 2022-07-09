import React from "react";
import { Marker } from "react-leaflet";
import { MarkerLocationIcon } from "./MarkerLocationIcon";
import MapPopUp from "./MapPopUp";

const MarkersMap = ({ locals }) => {
  const markers = locals.map((local) => (
    <Marker key={local.id} position={[local.latitude, local.longitude]} icon={MarkerLocationIcon}>
      <MapPopUp data={local} />
    </Marker>
  ));
  return <>{markers}</>;
};

export default MarkersMap;