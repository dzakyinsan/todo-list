import React, { useEffect } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { keepLogin } from "./redux/actions";
import Dashboard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import ListTodos from "./pages/todos/list-todo";
import ListPost from "./pages/post/list-post";
import DetailPost from "./pages/post/detail-post";
import Header from "./components/header";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add("body");
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    if (email) {
      dispatch(keepLogin(name, email));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact component={Dashboard} />
          <Route path={"/login"} exact component={Login} />
          <Route path={"/register"} exact component={Register} />
          <Route path={"/listTodo/:idParams"} component={ListTodos} />
          <Route path={"/listPost"} exact component={ListPost} />
          <Route path={"/postDetail/:id"} component={DetailPost} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
export default App;
