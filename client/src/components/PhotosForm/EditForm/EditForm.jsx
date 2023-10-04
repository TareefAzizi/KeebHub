import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";

export function EditForm({ setEditing, post }) {
  const [currentPost, setCurrentPost] = useState(post);
  const onChangeHandler = (e) => {
    setCurrentPost({ ...currentPost, [e.target.name]: e.target.value });
  };
  return (
    <Form>
      <FormGroup floating>
        <Input
          type="text"
          name="title"
          id="title"
          placeholder="Title"
          value={currentPost.title}
          onChange={onChangeHandler}
        />
        <Label for="title">Title</Label>
      </FormGroup>
      <FormGroup floating>
        <Input
          type="text"
          name="content"
          id="content"
          placeholder="Content"
          value={currentPost.content}
          onChange={onChangeHandler}
        />
        <Label for="content">Content</Label>
      </FormGroup>
      <Button color="danger" type="button" onClick={() => setEditing(false)}>
        Cancel
      </Button>
      <Button color="primary">Confirm</Button>
    </Form>
  );
}
