import React, { useContext, useEffect } from "react";
import classes from "./Button.module.css";
import { signInWithGoogle, googleLogout } from "../../services/auth";
import { UserContext } from "../../context/userContext";
import SendIcon from "@material-ui/icons/Send";
import DeleteIcon from "@material-ui/icons/Delete";
import { auth } from "../../firebase/firebase";

export const SignInSignUpBtn = () => {
  const [, setUser] = useContext(UserContext).user;

  const buttonClickHandler = async () => {
    let signedInUser = await signInWithGoogle();
    if (signedInUser) {
      setUser(signedInUser);
    }
  };

  // Below code is in continuation of auth component for retaining the user, in previous it was not rquired
  useEffect(() => {
    auth.onAuthStateChanged((res) => {
      console.log("onAuthStateChanged", res);
      if (res) {
        setUser(res);
      } else {
        setUser(null);
      }
    });
  }, []);

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

export const LogoutBtn = () => {
  const [, setUser] = useContext(UserContext).user;

  const buttonClickHandler = async () => {
    let google_logout_success = await googleLogout();
    if (google_logout_success) {
      setUser(null);
    }
  };

  return (
    <button
      onClick={buttonClickHandler}
      id="LogoutBtn"
      className={classes.LogoutBtn}
    >
      Logout
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

export const PostDeleteBtn = ({ onDeleteHandler }) => {
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

export const CreatePostBtn = ({ comment, addComment }) => {
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
