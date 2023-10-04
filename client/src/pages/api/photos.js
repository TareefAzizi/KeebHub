import axios from "axios";
// get all photos
export const getPhoto = async () => {
  const res = await axios.get("http://localhost:9000/photos");
  return res.data;
};

export const deletePhoto = async ({ id, token }) => {
  const res = await axios.delete(`http://localhost:9000/photos/${id}`, {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};

export const likePhoto = async ({ id, token }) => {
  const res = await axios.post(`http://localhost:9000/likes/${id}`, "", {
    headers: {
      "x-auth-token": token,
    },
  });
  return res.data;
};
