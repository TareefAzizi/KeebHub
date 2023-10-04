import {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import Editor from "@/components/editor";

export default function EditPost() {
  // const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const [redirect,setRedirect] = useState(false);
  useEffect(() => {
    const {id} = useParams()
    fetch('http://localhost:9000/edit'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, []);

  // console.log(id)

  async function updatePost(ev, postId) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);
    if (files?.[0]) {
      data.set('file', files?.[0]);
    }
    const response = await fetch(`http://localhost:9000/post/${postId}`, {
      method: 'PUT',
      body: data,
      credentials: 'include',
  });

    if (response.ok) {
      setRedirect(true);
    }
  }

  if (redirect) {
    return <Navigate to={'/edit/'+id} />
  }



  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <form onSubmit={(ev) => updatePost(ev, id)} className="space-y-4">
            <input type="title"
                   placeholder={'Title'}
                   value={title}
                   onChange={ev => setTitle(ev.target.value)}
                   className="block w-full px-4 py-2 rounded-lg outline-none border-gray-300" />
            <input type="summary"
                   placeholder={'Summary'}
                   value={summary}
                   onChange={ev => setSummary(ev.target.value)}
                   className="block w-full px-4 py-2 rounded-lg outline-none border-gray-300" />
            <input type="file"
                   onChange={ev => setFiles(ev.target.files)}
                   className="block w-full px-4 py-2 rounded-lg outline-none border-gray-300" />
            <Editor onChange={setContent} value={content} />
            <button className="mt-5 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Update post
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
