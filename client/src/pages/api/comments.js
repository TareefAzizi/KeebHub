// import axios from "axios";

// export const getComments = async (id) => {
//   const res = await axios.get(`http://localhost:9000/comments/${id}`);
//   return res.data;
// };

// export const commentPhoto = async ({ comment, token, id }) => {
//   const res = await axios.post(
//     `http://localhost:9000/comments/${id}`,
//     comment,
//     {
//       headers: {
//         "x-auth-token": token,
//       },
//     }
//   );
//   return res.data;
// };

// chatgpt

import axios from "axios";

export const getComments = async (id) => {
  console.log(id);
  const res = await axios.get(`http://localhost:9000/comments/${id}`);
  // console.log(res.data);
  return res.data;
};

export const commentPhoto = async ({ comment, token, id }) => {
  const res = await axios.post(
    `http://localhost:9000/comments/${id}`,
    comment,
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
  return res.data;
};
