import React from "react";
import { Breadcrumb } from "antd";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Card } from "antd";
import PostImage from "./../../assets/post.jpg";
import TodoImage from "./../../assets/todo.jpg";

import "./dashboard.css";

const Dashboard = () => {
  const history = useHistory();
  const { Meta } = Card;

  const dataUser = useSelector((state) => state.loginReducer.dataUser);
  const nameLs = localStorage.getItem("name");

  const goToListTodo = () => {
    history.push(`/listTodo/${dataUser?.id}`);
  };

  const goToListPost = () => {
    history.push(`/listPost`);
  };

  if (!nameLs) return <Redirect to={`login`} />;
  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row dashboard-cont">
          <div className="col-6 card-dashboard">
            <Card cover={<img alt="example" src={PostImage} height="400px" />} onClick={goToListPost}>
              <Meta title="List All Post" description="This is the the page that display all posts from the user" />
            </Card>
          </div>
          <div className="col-6 card-dashboard">
            <Card cover={<img alt="example" src={TodoImage} height="400px" />} onClick={goToListTodo}>
              <Meta title="List my Todo" description="This is the page that display your todo list" />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
