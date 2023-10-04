import React from "react";
import { useQuery } from "react-query";
import BeatLoader from "react-spinners/BeatLoader";
import { Comment } from "./Comment";
import { getComments } from "@/pages/api/comments";

export function CommentsList({ photoId }) {
  const { data: comments, isLoading, isError, error } = useQuery(["comments", photoId], () => getComments(photoId));

  console.log("comments in CommentsList component: ", comments);

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <BeatLoader color="#36d7b7" />
      </div>
    );

  if (isError)
    return (
      <div className="my-4 border-2 border-red-500 bg-red-50 text-red-600 px-4 py-2 rounded">
        <p>Error: {error.message}</p>
      </div>
    );

  return (
    <div className="text-black bg-gray-100 p-4 rounded shadow-lg my-4">
      {comments?.map((comment) =>
        <div className="bg-blue-100 rounded p-2 mb-2" key={comment._id}>
          <Comment comment={comment} />
        </div>
      )}
    </div>
  );
}
