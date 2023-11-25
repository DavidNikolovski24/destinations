"use client";
import React, { useEffect, useState } from "react";
import { PageProps } from "@/.next/types/app/layout";
import { getUser } from "@/models/login";

const login: React.FC<PageProps> = () => {
  const [dataClient, setDataClient] = useState<any>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const userToken = sessionStorage.getItem("token");
    if (userToken) {
      location.replace("/");
      return;
    }
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center">
      <h1 className="text-center font-extrabold text-2xl uppercase">
        Login Page
      </h1>
      <form
        className="w-full lg:w-1/3 mx-auto py-4 flex flex-col gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          getUser(dataClient.email, dataClient.password);
        }}
      >
        <div>
          <label htmlFor="loginEmail">Email:</label>
          <input
            className="w-full border-2 border-slate-900 p-1"
            type="email"
            name="loginEmail"
            id="loginEmail"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDataClient((prev: any) => ({
                ...prev,
                email: e.target.value,
              }));
            }}
          />
        </div>

        <div>
          <label htmlFor="loginPass">Password:</label>
          <input
            type="password"
            className="w-full border-2 border-slate-900 p-1"
            name="loginPass"
            id="loginPass"
            required
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setDataClient((prev: any) => ({
                ...prev,
                password: e.target.value,
              }));
            }}
          />
        </div>

        <button
          type="submit"
          className=" text-center border-2  border-slate-900 px-3 py-1 bg-slate-800 text-white hover:bg-gray-50 hover:text-slate-800"
        >
          Login
        </button>
      </form>
    </section>
  );
};

export default login;
