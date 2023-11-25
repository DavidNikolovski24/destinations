"use client";
import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import Map from "./map/Map";
import Link from "next/link";
import { decodeToken } from "react-jwt";

interface Props {
  location: string;
  description: string;
  latitude: number;
  longitude: number;
  id: number;
}
const CardLocation = ({
  location,
  description,
  latitude,
  longitude,
  id,
}: Props) => {
  const [modal, setModal] = useState(false);
  const [authorityUser, setAuthorityUser] = useState("");
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const modalHandler = () => setModal((prev) => !prev);

  useEffect(() => {
    if (sessionToken) {
      const myDecodedToken = decodeToken<any>(sessionToken);
      setAuthorityUser(myDecodedToken.authority[0]);
    }
  }, [sessionToken]);

  useEffect(() => {
    setSessionToken(sessionStorage.getItem("token"));
  }, []);

  return (
    <>
      <div
        className="border-2 py-5  hover:bg-slate-100 w-full lg:w-1/4 my-3 lg:my-0 text-center mx-auto cursor-pointer"
        onClick={modalHandler}
      >
        <h2 className="font-bold">{location}</h2>
        <p>{description}</p>
        {/* modal */}
      </div>
      {modal && (
        <div className="absolute top-1/2 left-1/2 w-2/3 h-2/3 origin-center transform-translate--50 bg-slate-100 border-2 border-slate-900 flex flex-col justify-between  px-5 py-3">
          <div>
            <div className="w-full flex justify-between items-center">
              <h2 className="font-extrabold text-2xl">{location}</h2>
              {authorityUser === "ROLE_ADMIN" && (
                <Link
                  href={`/edit-existing-card/${id}`}
                  className="bg-slate-950 text-white py-1 px-2 border border-slate-900 hover:bg-slate-400 hover:text-slate-900"
                  type="button"
                >
                  Edit
                </Link>
              )}
              <button
                type="button"
                className="font-extrabold text-2xl"
                onClick={modalHandler}
              >
                X
              </button>
            </div>
            <div className="mt-5">{description}</div>
          </div>

          <div>
            <Map latitude={latitude} longitude={longitude} />
          </div>
        </div>
      )}
    </>
  );
};

export default CardLocation;
