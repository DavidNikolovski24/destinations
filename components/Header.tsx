"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { decodeToken } from "react-jwt";

const Header = () => {
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [authorityUser, setAuthorityUser] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (sessionToken) {
      const myDecodedToken = decodeToken<any>(sessionToken);
      setAuthorityUser(myDecodedToken.authority[0]);
    }
  }, [sessionToken]);

  useEffect(() => {
    setSessionToken(sessionStorage.getItem("token"));
    if (sessionStorage.getItem("token") === null) {
      router.push("/login");
      return;
    }
  }, [pathname]);

  const logoutHandler = () => {
    sessionStorage.removeItem("token");
    return;
  };
  return (
    <header className="bg-slate-900 w-full">
      <nav>
        <ul className="max-w-screen-lg mx-auto flex justify-between px-5 py-3 lg:px-0  text-gray-100">
          <li>
            <Link href={"/"}>Logo</Link>
          </li>
          {sessionToken && authorityUser === "ROLE_ADMIN" ? (
            <ul className="flex gap-5">
              <li>
                <Link href={"/add-new-card"}>Add New Card</Link>
              </li>
            </ul>
          ) : (
            ""
          )}
          {sessionToken && (
            <li>
              <Link
                href="/login"
                onClick={() => {
                  logoutHandler();
                }}
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
