import Link from 'next/link';
import Post from "./Blog";
import {useEffect, useState} from "react";
import { useSession } from 'next-auth/react';

export default function Blog() {
  const [posts,setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      let res = await fetch("http://localhost:9000/post")
      let data = await res.json()
      if(data) {
        setPosts(data)
      }
      return res.data
    }
    fetchData()

    const fetchUser = async () => {
      let res = await fetch("http://localhost:9000/user")
      let data = await res.json()
      if(data) {
        setUser(data)
      }
    }
    fetchUser()
  }, []);

  return (
    <div className='min-h-screen'>
      <h1 className="text-center text-4xl font-bold my-5">All Blogs</h1>
      {posts?.length > 0 && posts.map(post => {
        return <Post key={post._id} {...post} />
      })}
      <Link href="/NewBlog">
        <button className="fixed right-5 bottom-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          New Blog
        </button>
      </Link>
    </div>
  );
}
