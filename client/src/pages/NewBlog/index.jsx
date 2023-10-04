import { useState } from "react";
import Router from 'next/router';
import Swal from 'sweetalert2';
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(import("react-quill"), { ssr: false });

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquite",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];


const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    ["clean"],
  ],
};

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");


  async function createNewPost(ev){
    ev.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('files', files[0]);

    try {
      const response = await fetch('http://localhost:9000/post', {
        method: 'POST',
        headers: {
          "x-auth-token": localStorage.getItem('token')
        },
        body: data,
      });

      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }

      const post = await response.json();
      console.log(post);

      Swal.fire({
        title: 'Success!',
        text: 'Your post has been made!',
        icon: 'success',
        confirmButtonText: 'OK'
      })
      .then(() => {
        Router.push('/Blog');
      });
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <form  onSubmit ={createNewPost}className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" encType="multipart/form-data">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white text-black"
            type="title"
            placeholder={"Title"}
            value={title}
            onChange={(ev) => setTitle(ev.target.value)}
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4 bg-white text-black"
            type="summary"
            placeholder={"Summary"}
            value={summary}
            onChange={(ev) => setSummary(ev.target.value)}
          />
<input
  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-4"
  type="file"
  name="files"
  onChange={(ev) => setFiles(ev.target.files)}
/>

          <ReactQuill
            className="mt-4 text-black"
            value={content}
            onChange={newValue => setContent(newValue)}
            modules={modules}
            formats={formats}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">
            Create post
          </button>
        </form>
      </div>
    </>
  );
}
