import React, { useEffect, useState } from "react";
import { Avatar, Breadcrumb, Divider, Tooltip } from "antd";
import Axios from "axios";
import { useHistory } from "react-router";
import { FormOutlined, WindowsOutlined } from "@ant-design/icons";
import "./../pages.css";

const Dashboard = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);

  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae", "#69e781"];

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
    setUsers(res.data);
  };

  const goToAlbums = (id) => {
    history.push(`/listAlbums/${id}`);
  };
  const goToPosts = (id) => {
    history.push(`/listPosts/${id}`);
  };

  const renderUsers = () => {
    return users?.map((user) => (
      <div className="col-md-4 col-sm-6 mt-4" key={user.id}>
        <div className="card-user">
          <div className="d-flex user-name">
            <Avatar className="avatar-user" style={{ fontSize: "15px", backgroundColor: ColorList[Math.floor(Math.random() * 4)] }}>
              <p>{user.name.charAt(0)}</p>
            </Avatar>
            <div className="name">
              <p> {user.username}</p>
              <span>{`${user.company.name} company`}</span>
            </div>
          </div>
          <Divider />
          <div className="d-flex description">
            <div>
              <ul>
                <li>
                  <p>name</p>
                </li>
                <li>
                  <p>email</p>
                </li>
                <li>
                  <p>Phone</p>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  <p>{user.name}</p>
                </li>
                <li>
                  <p>{user.email}</p>
                </li>
                <li>
                  <p>{user.phone}</p>
                </li>
              </ul>
            </div>
          </div>
          <Divider />

          <div className="row">
            <div className="col-6  actions">
              <Tooltip title="Posts">
                <FormOutlined onClick={() => goToPosts(user.id)} />
              </Tooltip>
            </div>
            <div className="col-6  actions">
              <Tooltip title="Albums">
                <WindowsOutlined onClick={() => goToAlbums(user.id)} />
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>Users</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">{renderUsers()}</div>
      </div>
    </div>
  );
};
export default Dashboard;
