import React from "react";
import { Card, CardBody, CardText } from "reactstrap";

export function Comment({ comment }) {
  console.log("comment in Comment component: ", comment);
  // console.log("comment.user in Comment component: ", comment.user);

  return (
    <Card>
      <CardBody>
        <CardText>{comment.user.name}:{comment.content}</CardText>
        <small></small>
      </CardBody>
    </Card>
  );
}
