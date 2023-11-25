"use client";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";

interface Props {
  latitude: number;
  longitude: number;
  userLatitude: number;
  userLongitude: number;
}

export default function Routing({
  latitude,
  longitude,
  userLatitude,
  userLongitude,
}: Props) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(latitude, longitude),
        L.latLng(userLatitude, userLongitude),
      ],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [map, latitude, longitude, userLatitude, userLongitude]);

  return null;
}
