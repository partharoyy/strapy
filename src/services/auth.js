import { auth, provider } from "../firebase/firebase";
import firebase from "firebase";

export const signInWithGoogle = async () => {
  let user;

  await auth
    .setPersistence(firebase.auth.Auth.Persistence.SESSION)
    .then(function () {
      auth
        .signInWithPopup(provider)
        .then((res) => {
          user = res.user;
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => console.log(error));

  return user;
};

//Below code is the previous version where auth was not retaining the user
// export const signInWithGoogle = async () => {
//   let user;
//   await auth
//     .signInWithPopup(provider)
//     .then((res) => {
//       user = res.user;
//     })
//     .catch((error) => {
//       console.log(error);
//     });

//   return user;
// };

export const googleLogout = async () => {
  let google_logout_success;
  await auth
    .signOut()
    .then(() => {
      google_logout_success = true;
    })
    .catch((error) => {
      console.log(error);
    });

  return google_logout_success;
};
