import React, { Fragment, useContext } from "react";
import classes from "./WelcomeText.module.css";
import { UserContext } from "../../context/userContext";

const WelcomeText = () => {
  const [user, setUser] = useContext(UserContext).user;

  return (
    <Fragment>
      {!user && (
        <div className={classes.welcome__text}>
          <h1 className={classes.connect}>connect</h1>
          <h1 className={classes.share}>share</h1>
          <h1 className={classes.cherish}>cherish</h1>
        </div>
      )}
    </Fragment>
  );
};

export default WelcomeText;
