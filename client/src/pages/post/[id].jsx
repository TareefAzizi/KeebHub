import { useContext, useEffect, useState } from 'react';
import { formatISO9075 } from 'date-fns';
import { UserContext } from "./UserContext";
import Link from "next/link";
import { useRouter } from 'next/router';
import jwt_decode from "jwt-decode"
import Popup from "@/components/popup"
import Swal from 'sweetalert2';

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [userInfo, setUserInfo] =useState()
  const [showPopup, setShowPopup] = useState(false);
  const [showNotification, setShowNotification] = useState(false);


  useEffect(() => {
    if(localStorage.getItem('token')) {
      let decoded = jwt_decode(localStorage.getItem('token'))
      setUserInfo(decoded)
    }
  }, [])


  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch(`http://localhost:9000/post/${id}`);
      let data = await res.json();
      if (data) setPostInfo(data);
    };

    fetchData();
  }, [id]);

  if (!postInfo) return '';


  async function deletePost() {
    try {
      const response = await fetch(`http://localhost:9000/post/${id}`, {
        method: 'DELETE',
        headers: {
          "x-auth-token": localStorage.getItem("token")
        }
      });

      if (!response.ok) {
        const message = `An error has occurred: ${response.status}`;
        throw new Error(message);
      }

      // Assuming the response status is 200 (OK)
      Swal.fire({
        title: 'Success!',
        text: 'Post has been deleted.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        router.push('/Blog');
      });

    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: error.message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }






//   console.log("postInfo",postInfo)
// console.log("author",postInfo.author._id)
// console.log("userInfo",userInfo.user._id)

function handlePopupClick() {
  setShowPopup(!showPopup);
}


return (
  <>
    <div className="post-page bg-white max-w-3xl mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl min-h-screen">
      <div className="mb-8">
        <h1 className="text-5xl font-bold mb-6 text-indigo-800">{postInfo.title}</h1>
        <div className="flex items-center text-gray-600 text-sm mb-6">
          <div className="mr-2 font-medium">By {postInfo.author.username}</div>
          <div className="ml-2 text-gray-500">Posted on {formatISO9075(new Date(postInfo.createdAt))}</div>
        </div>
      </div>
      <div className="image mb-8">
        <img src={`http://localhost:9000/${postInfo.cover.replace('uploads', '')}`} alt="image" className="w-full h-64 object-cover object-center rounded-lg shadow-md" />
      </div>
      <div className="content text-gray-800 text-lg leading-relaxed mb-6" dangerouslySetInnerHTML={{ __html: postInfo.content }} />

      {(userInfo?.user?._id === postInfo?.author?._id || userInfo?.user?.isAdmin === true) && (
        <button onClick={deletePost} className="self-end py-2 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-200 ease-in-out transform hover:scale-105">
          Delete post
        </button>
      )}
    </div>

    {showPopup ? <Popup onClose={handlePopupClick} postInfo={postInfo}/> : null}
  </>
);

}

export async function getServerSideProps(context) {
let { id } = context.query;

return {
  props: {
    id,
  },
};
}
