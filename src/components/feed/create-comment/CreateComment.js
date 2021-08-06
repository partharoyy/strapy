import React, { useState, useContext, useRef } from "react";
import classes from "./CreateComment.module.css";
import { CreatePostBtn } from "../../../ui/button/Button";
import { UserContext } from "../../../context/userContext";
import { db } from "../../../firebase/firebase";

const CreateComment = ({ id, comments, onClickCommentInput }) => {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState(comments ? comments : []);
  const [user] = useContext(UserContext).user;

  const commentRef = useRef();

  const addComment = () => {
    if (comment !== "") {
      commentList.push({
        comment,
        username: user.email.replace("@gmail.com", "").toLowerCase(),
      });

      db.collection("posts")
        .doc(id)
        .update({
          comments: commentList,
        })
        .then(() => {
          setComment("");
          onClickCommentInput(false);
          console.log("comment added");
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <div className={classes.create_comment_container}>
      <textarea
        onChange={() => {
          setComment(commentRef.current.value);
        }}
        name="create_comment_field"
        id="create_comment_field"
        placeholder="enter comment here.."
        value={comment}
        ref={commentRef}
        rows="2"
        className={classes.createComment_textarea}
      ></textarea>
      <CreatePostBtn comment={comment} addComment={addComment} />
    </div>
  );
};

export default CreateComment;
