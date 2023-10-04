import React from "react";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import {useState, useEffect} from "react"
import { useMutation, useQueryClient } from "react-query";
import { deletePhoto, likePhoto } from "../api/photos";
import { getToken } from "../../utils/helpers";
import CommentForm from "@/components/PhotosForm/CommentForm/CommentForm";
import { CommentsList } from "@/components/comment/CommentList";

export default function SinglePhotos({ photo }) {
  const [userInfo, setUserInfo] =useState()

  useEffect(() => {
    if(localStorage.getItem('token')) {
      let decoded = jwt_decode(localStorage.getItem('token'))
      setUserInfo(decoded)
    }
  }, [])

  const queryClient = useQueryClient();
  const token = getToken();
  const decoded = token ? jwt_decode(token) : null;

  const { mutate } = useMutation(deletePhoto, {
    onSuccess: (data) => {
      Swal.fire("Deleted!", data.msg, "success");
      queryClient.invalidateQueries("posts");
      window.location.reload()
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const deleteHandler = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        mutate({ id, token });
      }
    });
  };

  const { mutate: likeMutate } = useMutation(likePhoto, {
    onSuccess: (data) => {
      Swal.fire("Liked!", data.msg, "success");
      queryClient.invalidateQueries("posts");
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const likeHandler = (id) => {
    alert(id);
    likeMutate({ id, token });
  };

  console.log("photo", photo)

  return (
    <div className="mx-auto bg-white rounded-lg shadow-lg m-4 overflow-hidden  w-1/2 max-w-4xl">
      <div>
        <img className="w-full h-64 object-cover" src={`http://localhost:9000/${photo.imageUrl.replace('uploads', "")}`} alt={photo.title} />
      </div>
      <div className="px-6 py-4 bg-gray-100">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center text-lg font-semibold text-gray-800">
            <div>Posted by:{photo.user.name}</div>
          </div>
          {(token && decoded.user._id === photo.user._id || userInfo?.user?.isAdmin === true) &&(
            <div className="space-x-2">
              <button className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded" onClick={() => deleteHandler(photo._id)}>
                Delete
              </button>
            </div>
          )}
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-800">{photo.title}</h2>
        <div className="mb-2">
          <span className="inline-block text-sm font-medium text-gray-700 mr-2">{photo.likes.length} likes</span>
          <button className="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded" onClick={() => likeHandler(photo._id)}>
            Like
          </button>
        </div>

        <p className="mb-2 text-gray-600">{photo.content}</p>

        {token ? <CommentForm post={photo} user={decoded.user} /> : null}
        <CommentsList className="text-gray-800" photoId={photo._id} />
      </div>
    </div>
  );
}
