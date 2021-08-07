import React, { Fragment, useContext } from "react";
import classes from "./Header.module.css";
import { SignInSignUpBtn, LogoutBtn } from "../../ui/button/Button";
import { UserContext } from "../../context/userContext";

const Header = () => {
  const [user] = useContext(UserContext).user;

  return (
    <Fragment>
      <header className={classes.header}>
        <div className={classes.left__side}>
          <h1>strapy.</h1>
        </div>
        <div className={classes.right__side}>
          {user ? (
            <div className={classes.right__side_logout} key={user.id}>
              <LogoutBtn />
              <img
                className={classes.profileImage}
                src={user.photoURL}
                alt="loggedInUserProfileImg"
              />
            </div>
          ) : (
            <SignInSignUpBtn />
          )}
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
