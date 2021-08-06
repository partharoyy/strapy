import React, { useContext, useRef, useState } from "react";
import classes from "./CreatePost.module.css";
import { UserContext } from "../../context/userContext";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { CreatePostUploadBtn } from "../../ui/button/Button";
import { makeid } from "../../helper/functions";
import { storage, db, timestamp } from "../../firebase/firebase";
import firebase from "firebase";

const CreatePost = () => {
  const [user, setUser] = useContext(UserContext).user;
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const postRef = useRef();
  const imageRef = useRef();

  const onChangeHandler = () => {
    if (imageRef.current.files[0]) {
      setImage(imageRef.current.files[0]);

      //getting the url selected image
      let selectedImageURL = URL.createObjectURL(imageRef.current.files[0]);

      //getting the image element so that we can set the src for it
      let imageElement = document.getElementById("image_preview");

      //setting the src for the image element
      imageElement.src = selectedImageURL;

      //initially we have set image as null in case no image is selected it will use a fallback, we dont want that
      //now will set the image display property
      imageElement.style.display = "block";
    }
  };

  const onUploadHandler = () => {
    //checks for image availability
    if (image) {
      //make random image name
      let imageName = makeid(10);
      //create a placeholder for new image and then put the received imaged in above
      const uploadTask = storage.ref(`images/${imageName}.jpg`).put(image);

      //listen to the uploaded image
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          let uploadProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(uploadProgress);
        },
        (error) => {
          console.log(error);
        },
        () => {
          //grab the uploaded image url and put it in the database
          storage
            .ref("images")
            .child(`${imageName}.jpg`)
            .getDownloadURL()
            .then((imageUrl) => {
              db.collection("posts").add({
                caption: caption,
                photoUrl: imageUrl,
                profileUrl: user.photoURL,
                timestamp: timestamp,
                username: user.email.replace("@gmail.com", "").toLowerCase(),
                likes: 0,
              });
            });
          setCaption("");
          setProgress(0);
          let imageElement = document.getElementById("image_preview");
          imageElement.style.display = "none";
        }
      );
    }
  };

  return (
    <div className={classes.createPost}>
      {user && (
        <div className={classes.createPost_main_container}>
          <h4>Create post</h4>
          <div className={classes.createPost_textarea_container}>
            <textarea
              onChange={() => {
                setCaption(postRef.current.value);
              }}
              name="create_post_field"
              id="create_post_field"
              placeholder="enter caption here.."
              value={caption}
              ref={postRef}
              cols="70"
              rows="4"
              className={classes.createPost_textarea}
            ></textarea>
            <div className={classes.createPost_image_preview}>
              <img
                alt=""
                id="image_preview"
                className={classes.image_preview}
              />
            </div>
          </div>
          <div className={classes.createPost_image_uploader_container}>
            <label htmlFor="image_uploader_input">
              <AddAPhotoIcon
                style={{
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              />
            </label>
            <input
              id="image_uploader_input"
              type="file"
              accept="image/*"
              ref={imageRef}
              onChange={onChangeHandler}
              className={classes.createPost_image_uploader_input}
            />
            <CreatePostUploadBtn
              caption={caption}
              progress={progress}
              onUploadHandler={onUploadHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
