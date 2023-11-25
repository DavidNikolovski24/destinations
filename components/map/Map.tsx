"use client";
import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import Routing from "./Routing";

interface Props {
  latitude: number;
  longitude: number;
}

const Map = ({ latitude, longitude }: Props) => {
  const [userLatitude, setUserLatitude] = useState(0);
  const [userLongitude, setUserLongitude] = useState(0);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        setUserLatitude(position.coords.latitude);
        setUserLongitude(position.coords.longitude);
      },
      function (error) {
        console.error("Error Code = " + error.code + " - " + error.message);
      }
    );
  }, []);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={14}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]} />
      <Routing
        userLatitude={userLatitude}
        userLongitude={userLongitude}
        latitude={latitude}
        longitude={longitude}
      />
    </MapContainer>
  );
};

export default Map;
