import { auth, provider } from "../firebase/firebase";

export const signInWithGoogle = async () => {
  let user;
  await auth
    .signInWithPopup(provider)
    .then((res) => {
      user = res.user;
    })
    .catch((error) => {
      console.log(error);
    });

  return user;
};

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
