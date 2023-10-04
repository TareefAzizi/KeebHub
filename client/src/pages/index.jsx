import React from "react";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import Script from 'next/script'
import Sponsor from "@/components/Sponsor";
import "bootstrap/dist/css/bootstrap.css";

function Home() {
  const router = useRouter();

  return (
    <>
      <div className="hero min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto flex items-center">
          <div className="w-1/2">
            <img
              src="/landingimage.jpg"
              className="mx-auto rounded-lg shadow-lg"
              alt="Unikorn"
            />
          </div>
          <div className="w-1/2 text-center">
            <h1 className="mb-5 text-5xl font-bold text-gray-800">
              Welcome to KeebHub
            </h1>
            <p className="mb-5 text-lg text-gray-700">
              KeebHub is a social media application for the Custom Keyboard community where people can share pictures of their keyboards and Write blogs about it.
              </p>
            <div className="mt-5">
              <Link href="/supportme">
                <button className="px-6 py-3 text-lg text-white bg-indigo-500 rounded-full hover:bg-indigo-600 focus:outline-none">
                  Support Us
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Home;
