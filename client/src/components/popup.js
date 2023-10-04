import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "@/components/editor";

export default function Popup({ onClose, postInfo }) {
  // const { id } = useParams();
  // const [title, setTitle] = useState("");
  // const [summary, setSummary] = useState("");
  // const [content, setContent] = useState("");
  // const [files, setFiles] = useState("");

  const [updatedPost, setUpdatedPost] = useState(postInfo);

  // const [redirect, setRedirect] = useState(false);

  // if (redirect) {
  //   return <Navigate to={"/edit/" + id} />;
  // }

  const onChangeHandler = (ev) => {
    // console.log(ev.target?.value);
    // setUpdatedPost({ ...updatedPost, [ev?.target?.name]: ev?.target?.value });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl mb-4">Your Popup Content</h2>
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder={"Title"}
                  value={updatedPost.title}
                  onChange={onChangeHandler}
                  name="title"
                  className="block w-full px-4 py-2 rounded-lg outline-none border-gray-300"
                />
                <input
                  name="summary"
                  type="text"
                  placeholder={"Summary"}
                  value={updatedPost.summary}
                  onChange={onChangeHandler}
                  className="block w-full px-4 py-2 rounded-lg outline-none border-gray-300"
                />
                <input
                  type="file"
                  className="block w-full px-4 py-2 rounded-lg outline-none border-gray-300"
                />
                <Editor
                  onChange={onChangeHandler}
                  name="content"
                  value={updatedPost.content}
                />
                <button className="mt-5 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  Update post
                </button>
                <button
                  onClick={() => onClose(false)}
                  type="button"
                  className="mt-4 py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
