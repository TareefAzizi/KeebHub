import { useQuery } from "react-query";
import { PacmanLoader } from "react-spinners";
import SinglePhotos from "./SinglePhotos";
import { getPhoto } from "../api/photos";

export default function PhotosList() {
  const { data, error, isLoading } = useQuery("photos", getPhoto);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <PacmanLoader color="#36d7b7" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-3xl text-red-500">Error: {error.message}</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 px-4">
      <h2 className="mb-6 text-3xl font-bold text-center">All Photos</h2>
      <div className="flex flex-col items-center space-y-6">
        {[...data].reverse().map((photo) => (
          <SinglePhotos photo={photo} key={photo._id} />
        ))}
      </div>
    </div>
  );
}
