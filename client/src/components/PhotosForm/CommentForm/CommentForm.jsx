import React, { useState } from "react";
import { Form, FormGroup, Input, Button } from "reactstrap";
import { useMutation, useQueryClient } from "react-query";
import Swal from "sweetalert2";
import { commentPhoto } from "@/pages/api/comments";

// Component for Comment Form
export default function CommentForm({ post, user }) {
  const [comment, setComment] = useState({
    content: "",
    photo: post._id,  // Assuming you want to use post id here
    user: user._id,
  });

  const queryClient = useQueryClient();

  const onChangeHandler = (e) => {
    setComment({ ...comment, content: e.target.value });
  };

  // Alert for success action
  const showSuccessAlert = (message) => {
    Swal.fire("Success", message, "success");
  };

  // Alert for error action
  const showErrorAlert = (message) => {
    Swal.fire("Oops...", message, "error");
  };

  const { mutate } = useMutation(commentPhoto, {
    onSuccess: ({ msg }) => {
      showSuccessAlert(msg);
      queryClient.invalidateQueries("comments");
    },
    onError: ({ response }) => {
      showErrorAlert(response.data.msg);
    },
  });

  const getToken = () => localStorage.getItem("token");

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const token = getToken();
    mutate({ comment, token, id: post._id });
  };

  return (
    <Form onSubmit={onSubmitHandler}>
      <FormGroup>
        <Input
          type="textarea"
          name="content"
          onChange={onChangeHandler}
          placeholder="Enter your comment here..."
        />
      </FormGroup>
      <Button
  className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-2 px-4 rounded"
>
  Add Comment
</Button>

    </Form>
  );
}
