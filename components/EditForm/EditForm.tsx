import { IUpdatedData } from "@/app/edit-existing-card/[id]/page";
import React from "react";
interface Props {
  submitHandler: (e: any) => void;
  setUpdatedData: any;
  errorField: string;
  btnInnerText: string;
}
const EditForm = ({
  setUpdatedData,
  submitHandler,
  errorField,
  btnInnerText,
}: Props) => {
  const dataSetter = (e: any) => {
    const field = e.target.name;
    const value = e.target.value;
    setUpdatedData((prev: IUpdatedData) => {
      return { ...prev, [field]: value };
    });
  };

  return (
    <form
      className="flex flex-col items-center gap-5 my-4 w-full mx-auto md:w-2/5"
      onSubmit={submitHandler}
    >
      <input
        className={`w-full border border-blue-950 px-3 py-2 text-blue-950 ${
          errorField === "location" && "border-red-600"
        }`}
        type="text"
        name="location"
        placeholder="Name of place"
        onChange={dataSetter}
      />
      <input
        className={`w-full border border-blue-950 px-3 py-2 text-blue-950 ${
          errorField === "longitude" && "border-red-600"
        }`}
        type="text"
        name="longitude"
        min={1}
        placeholder="Enter Longitude"
        onChange={dataSetter}
      />
      <input
        className={`w-full border border-blue-950 px-3 py-2 text-blue-950 ${
          errorField === "latitude" && "border-red-600"
        }`}
        type="text"
        name="latitude"
        min={1}
        placeholder="Enter Latitude"
        onChange={dataSetter}
      />
      <textarea
        className={`w-full border border-blue-950 px-3 py-2 text-blue-950 ${
          errorField === "description" && "border-red-600"
        }`}
        placeholder="Enter Description"
        name="description"
        onChange={dataSetter}
      ></textarea>
      <button
        type="submit"
        className=" w-full text-center border-2  border-slate-900 px-3 py-1 bg-slate-800 text-white hover:bg-gray-50 hover:text-slate-800"
      >
        {btnInnerText}
      </button>
    </form>
  );
};

export default EditForm;
