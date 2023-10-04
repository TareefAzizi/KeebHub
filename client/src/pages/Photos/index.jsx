import React from "react";
import { useRouter } from 'next/router';
import PhotosList from "./PhotosList";
import AddForm from "@/components/PhotosForm/AddForm/AddForm";
import { useQuery } from "react-query";

export default function Photos() {
  const { data: token } = useQuery("getToken", () => localStorage.getItem("token"));
  const router = useRouter();

  let Element;


  return (
    <>

      {token ? <AddForm /> : null}
      <PhotosList></PhotosList>
    </>
  );
}

