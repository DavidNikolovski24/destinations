"use client";
import React, { useState } from "react";
import baseUrl from "../../../api/axios";
import EditForm from "@/components/EditForm/EditForm";
import { useRouter } from "next/navigation";

const page = ({ params }: any) => {
  const { id } = params;
  const [errorMsg, setErrorMsg] = useState("");
  const [errorField, setErrorField] = useState("");
  const router = useRouter();

  const initialData = {
    location: "",
    longitude: "0",
    latitude: "0",
    description: "",
    isRecommended: false,
  };
  const [updatedData, setUpdatedData] = useState<IUpdatedData>(initialData);

  const submitHandler = (e: any) => {
    e.preventDefault();
    const userToken = sessionStorage.getItem("token");
    try {
      // location
      if (updatedData.location.length === 0) {
        setErrorMsg("Enter location");
        setErrorField("location");
        return;
      } else {
        if (
          updatedData.location.length < 3 ||
          updatedData.location.length > 20 ||
          Number(updatedData.location)
        ) {
          setErrorMsg("Enter valid location name");
          setErrorField("location");
          return;
        }
      }
      // longitude
      if (
        updatedData.longitude.length < 5 ||
        updatedData.longitude.length > 30
      ) {
        setErrorMsg("Enter valid longitude");
        setErrorField("longitude");
        return;
      } else {
        if (!Number(updatedData.longitude)) {
          setErrorMsg("Enter number");
          setErrorField("longitude");

          return;
        } else {
          if (!updatedData.longitude.includes(".")) {
            setErrorMsg("Enter valid format of longitude, with dot");
            setErrorField("longitude");

            return;
          }
        }
      }
      // latitude
      if (updatedData.latitude.length < 5 || updatedData.latitude.length > 30) {
        setErrorMsg("Enter valid latitude");
        setErrorField("latitude");

        return;
      } else {
        if (!Number(updatedData.latitude)) {
          setErrorMsg("Enter number");
          setErrorField("latitude");
          return;
        } else {
          if (!updatedData.latitude.includes(".")) {
            setErrorMsg("Enter valid format of latitude, with dot");
            setErrorField("latitude");

            return;
          }
        }
      }
      // desc
      if (updatedData.description.length === 0) {
        setErrorMsg("Enter description");
        setErrorField("description");

        return;
      } else {
        if (
          updatedData.description.length < 3 ||
          Number(updatedData.description)
        ) {
          setErrorMsg("Enter valid description");
          setErrorField("description");
          return;
        }
      }
      setErrorMsg("");
      setErrorField("");

      const response = baseUrl.put(
        `/rest/location/edit/${id}`,
        updatedData,

        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="relative pt-5">
      {errorMsg.length !== 0 && (
        <p className="text-red-600 font-bold text-center absolute top-4 left-1/2 transform-translate--50">
          {errorMsg}!
        </p>
      )}
      <EditForm
        setUpdatedData={setUpdatedData}
        submitHandler={submitHandler}
        errorField={errorField}
      />
    </section>
  );
};

export default page;
export interface IUpdatedData {
  location: string;
  longitude: string;
  latitude: string;
  description: string;
  isRecommended: boolean;
}
