import React, { useRef, useState } from "react";
import { Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";

const MapPopUp = ({data}) => {
  
  let location = useLocation()

  if(location.pathname === "/user/admin/map") {
    <Popup closeOnClick={true}>
    </Popup>
  } else {
    return (
      <Popup closeOnClick={true}>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
          {
            data.avatar ? <img style={{width: "30px"}} src={data.avatar} alt="" />
            : null
          }
          <h3>{data.name}</h3>
          <p>{data.email}</p>
  
        </div>
      </Popup>
    );
  }

};

export default MapPopUp;