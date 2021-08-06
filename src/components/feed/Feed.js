import React, { useContext, useState, useEffect, Fragment } from "react";
import classes from "./Feed.module.css";
import { Post_Delete_Btn } from "../../ui/button/Button";
import { UserContext } from "../../context/userContext";
import Post from "./post/Post";
import { db, timestamp, storage } from "../../firebase/firebase";

const Feed = () => {
  const [user] = useContext(UserContext).user;
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            post: doc.data(),
          }))
        );
      });
  }, []);

  const onDeleteHandler = (id, post) => {
    //targeting
    let imageRef = storage.refFromURL(post.photoUrl);

    //deleting the image
    imageRef
      .delete()
      .then(() => console.log("Deleted successfully"))
      .catch((error) => console.log(error.message));

    //deleting the post
    db.collection("posts")
      .doc(id)
      .delete()
      .then(() => console.log("Deleted successfully"))
      .catch((error) => console.log(error.message));
  };

  return (
    <Fragment>
      {posts.map(({ id, post }) => {
        return (
          <div className={classes.feed}>
            <div className={classes.feed_container}>
              <div className={classes.feed_left_side}>
                <img
                  key={Math.random()}
                  src={post.profileUrl}
                  alt="profile_pic"
                  className={classes.feed_img}
                />
                <p key={Math.random()} className={classes.feed_username}>
                  {post.username}
                </p>
              </div>
              <div className={classes.feed_right_side}>
                {post.username === user.email.replace("@gmail.com", "") && (
                  <Post_Delete_Btn
                    key={Math.random()}
                    onDeleteHandler={() => onDeleteHandler(id, post)}
                  />
                )}
              </div>
            </div>
            <Post
              key={id}
              id={id}
              profileUrl={post.profileUrl}
              username={post.username}
              imageUrl={post.photoUrl}
              caption={post.caption}
              comments={post.comments}
              user={user}
              timestamp={post.timestamp}
              likes={post.likes}
            />
          </div>
        );
      })}
    </Fragment>
  );
};

export default Feed;
