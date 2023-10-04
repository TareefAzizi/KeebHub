import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import jwt_decode from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";
import { RotateLoader } from "react-spinners";

export default function AddForm() {
  const queryClient = useQueryClient();
  const { data: token } = useQuery("getToken", () =>
    localStorage.getItem("token")
  );
  let decoded = jwt_decode(token);

  const [post, setPost] = useState({
    title: "",
    content: "",
    user: decoded.user._id,
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null); // New state for storing image preview URL

  const handlePost = async (postData) => {
    const formData = new FormData();
    Object.keys(postData).forEach(key => formData.append(key, postData[key]));
    formData.append('image', file);

    const res = await axios.post("http://localhost:9000/Photos", formData, {
      headers: {
        "x-auth-token": token,
        'Content-Type': 'multipart/form-data'
      },
    });
    return res.data;
  };

  const { mutate, isLoading } = useMutation(handlePost, {
    onSuccess: (data) => {
      Swal.fire("Success", data.msg, "success");
      queryClient.invalidateQueries("posts");
      window.location.reload(); // Reload page on successful post
    },
    onError: (error) => {
      Swal.fire("Oops...", error.response.data.msg, "error");
    },
  });

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (token) {
      mutate(post);
    }
    e.target.reset();
    setPost({ ...post, title: "", content: "" });
    setFile(null);
    setPreview(null); // Reset preview on submit
  };

  const onChangeHandler = (e) => {
    if (e.target.name === 'photo') {
      setFile(e.target.files[0]);
      setPreview(URL.createObjectURL(e.target.files[0])); // Update preview URL
    } else {
      setPost({ ...post, [e.target.name]: e.target.value });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="flex flex-col w-full p-6 space-y-2 md:w-1/2 lg:w-1/3">
        <h2 className="mb-5 text-lg font-bold text-center">Add Post</h2>
        <form className="flex flex-col space-y-5 text-white" onSubmit={onSubmitHandler}>
          <div>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline text-white"
              type="text"
              name="title"
              id="title"
              placeholder="Title"
              onChange={onChangeHandler}
            />
          </div>
          <div>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline text-white"
              type="file"
              name="photo"
              id="photo"
              placeholder="Photo"
              onChange={onChangeHandler}
            />
            {preview && <img src={preview} alt="Preview" className="mt-2 w-full h-auto"/>} {/* Add this to show the preview */}
          </div>
          <div>
            <input
              className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline text-white"
              type="text"
              name="content"
              id="content"
              placeholder="Content"
              onChange={onChangeHandler}
            />
          </div>
          <button
            className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isLoading ? <RotateLoader color="#36d7b7" /> : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
}
