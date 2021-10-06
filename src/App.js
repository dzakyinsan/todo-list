import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Header from "./components/header";
import ListAlbums from "./pages/albums/list-albums";
import ListPosts from "./pages/posts/list-post";
import DetailPost from "./pages/posts/detail-post";
import "./App.css";

function App() {
  useEffect(() => {
    document.body.classList.add("body");
  }, []);

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact component={Dashboard} />
          <Route path={"/listAlbums/:id"} component={ListAlbums} />
          <Route path={"/listPosts/:id"} component={ListPosts} />
          <Route path={"/postDetail/:id"} component={DetailPost} />
          {/* <Route path={"/listPhoto"} component={listPhoto} /> */}
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
