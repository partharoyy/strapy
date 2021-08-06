import React, { useContext } from "react";
import classes from "./Button.module.css";
import { signInWithGoogle } from "../../services/auth";
import { UserContext } from "../../context/userContext";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";

export const SignInSignUpBtn = () => {
  const [, setUser] = useContext(UserContext).user;

  const buttonClickHandler = async () => {
    let signedInUser = await signInWithGoogle();
    if (signedInUser) {
      setUser(signedInUser);
    }
  };

  return (
    <button
      onClick={buttonClickHandler}
      id="signIn__signUp__btn"
      className={classes.signIn__signUp__btn}
    >
      sign in | sign up
    </button>
  );
};

export const CreatePostUploadBtn = ({
  caption,
  onUploadHandler,
  progress: uploaded,
}) => {
  return (
    <SendIcon
      className={classes.createPost_upload_btn}
      onClick={onUploadHandler}
      style={{
        cursor: "pointer",
        fontSize: "1.2rem",
        color: !caption && "lightgrey",
      }}
    />
  );
};

export const Post_Delete_Btn = ({ post, onDeleteHandler }) => {
  return (
    <DeleteIcon
      className={classes.post_Delete_Btn}
      onClick={onDeleteHandler}
      style={{
        cursor: "pointer",
        fontSize: "1.2rem",
      }}
    />
  );
};

export const Create_Post_Btn = ({ comment, addComment }) => {
  return (
    <SendIcon
      className={classes.create_post_btn}
      onClick={addComment}
      style={{
        color: !comment && "lightgrey",
        cursor: "pointer",
        fontSize: "1.2rem",
        marginTop: "1.4rem",
      }}
    />
  );
};