import { useSession, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { getLoggedUser, logout } from "@/pages/api/users";
import { useRouter } from "next/router";

export default function Profile() {
  const { data: session } = useSession();
  const { data: user, isLoading, isError } = useQuery("profile", getLoggedUser);
  const router = useRouter();

  console.log(session?.token)

  const handleLogout = async () => {
    await logout();
    router.push("/");
    if (typeof window !== "undefined") { // check to ensure this is run in the browser
      window.location.reload();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white text-2xl">
        Loading...
      </div>
    );
  }

  if (isError || (!user && !session)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 to-blue-500 text-white text-2xl">
        You are not logged in.
      </div>
    );
  }

  // if logged in locally
  if (user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4 glow-text">Welcome, {user.username}!</h1>
          <p className="text-2xl mb-8 glow-text">Email: {user.email}</p>
          <button
            onClick={handleLogout}
            className="py-2 px-4 bg-red-600 hover:bg-red-500 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Logout
          </button>
        </div>
        <style jsx>{`
          .glow-text {
            text-shadow: 0 0 10px #ff00c8, 0 0 15px #ff00c8, 0 0 20px #ff00c8,
              0 0 25px #ff00c8, 0 0 30px #ff00c8;
          }
        `}</style>
      </div>
    );
  }

  // if logged in with Google
  if (session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-4xl mb-4 glow-text">Welcome, {session.user.name}!</h1>
          <p className="text-2xl mb-8 glow-text">Email: {session.user.email}</p>
          <button
            onClick={() => signOut()}
            className="py-2 px-4 bg-red-600 hover:bg-red-500 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            Logout
          </button>
        </div>
        <style jsx>{`
          .glow-text {
            text-shadow: 0 0 10px #ff00c8, 0 0 15px #ff00c8, 0 0 20px #ff00c8,
              0 0 25px #ff00c8, 0 0 30px #ff00c8;
          }
        `}</style>
      </div>
    );
  }
}
