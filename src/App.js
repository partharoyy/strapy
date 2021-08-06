import { Fragment } from "react";
import "./App.css";
import Header from "./components/header/Header";
import WelcomeText from "./components/welcome/WelcomeText";
import CreatePost from "./components/create-post/CreatePost";
import Feed from "./components/feed/Feed";
import { UserContext } from "./context/userContext";
import { useContext } from "react";

function App() {
  const [user] = useContext(UserContext).user;

  return (
    <Fragment>
      <Header />
      <WelcomeText />
      <CreatePost />
      {user && <Feed />}
    </Fragment>
  );
}

export default App;
