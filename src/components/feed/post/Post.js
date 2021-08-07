import React, { useState } from "react";
import CreateComment from "../create-comment/CreateComment";
import classes from "./Post.module.css";
import MessageIcon from "@material-ui/icons/Message";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { db } from "../../../firebase/firebase";

const Post = ({
  id,
  profileUrl,
  username,
  imageUrl,
  caption,
  comments,
  user,
  timestamp,
  likes,
}) => {
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [likeClicked, setLikeClicked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const onClickCommentInput = () => {
    setShowCommentInput((prevState) => !prevState);
  };

  const onLikeClicked = () => {
    setLikeClicked(true);

    if (likeCount >= 1) {
      db.collection("posts")
        .doc(id)
        .update({
          likes: likeCount,
        })
        .then(() => {
          console.log(likeCount);
          console.log("like added");
        })
        .catch((error) => console.log(error.message));
    }
  };

  return (
    <div className={classes.post_container}>
      <img src={imageUrl} alt="posted_img" className={classes.post_img} />
      <div className={classes.caption_container}>
        <p className={classes.poster_username}>{username}</p>
        <p className={classes.poster_caption}>{caption}</p>
      </div>
      {comments ? (
        comments.map((comment) => (
          <div className={classes.post_comments} key={Math.random()}>
            <div className={classes.comment_username}>{comment.username}</div>
            <div className={classes.comment_comment}>{comment.comment}</div>
          </div>
        ))
      ) : (
        <></>
      )}

      <div className={classes.msg_icon_container}>
        <MessageIcon
          className={classes.msg_icon}
          onClick={onClickCommentInput}
        />
        <div className={classes.heart_icon} onClick={onLikeClicked}>
          {likeClicked ? (
            <FavoriteIcon
              onClick={() => setLikeCount(likeCount + 1)}
              style={{ fill: "red" }}
            />
          ) : (
            <FavoriteBorderIcon />
          )}
        </div>
        <p className={classes.like}>{`${likeCount} ${
          likeCount === 0 ? "like" : likeCount === 1 ? "like" : "likes"
        }`}</p>
      </div>
      {showCommentInput && (
        <CreateComment
          key={id}
          id={id}
          comments={comments}
          onClickCommentInput={onClickCommentInput}
        />
      )}
    </div>
  );
};

export default Post;
