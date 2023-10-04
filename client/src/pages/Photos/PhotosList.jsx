import { useQuery } from "react-query";
import { PacmanLoader } from "react-spinners";
import SinglePhotos from "./SinglePhotos";
import { getPhoto } from "../api/photos";

export default function PhotosList() {
  const { data, error, isLoading } = useQuery("photos", getPhoto);

  if (isLoading) {
    return <PacmanLoader color="#36d7b7" />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-2xl text-red-500">Error {error.message}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-4">
      <h2 className="mb-3 text-2xl font-bold text-center">All Posts</h2>
      <div className="flex flex-col items-center">
        {[...data].reverse().map((photo) => (
          <SinglePhotos photo={photo} key={photo._id} />
        ))}
      </div>
    </div>
  );
}
