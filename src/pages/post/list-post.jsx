import React, { useEffect, useState } from "react";
import { Avatar, Breadcrumb, Divider } from "antd";
import Axios from "axios";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import EmptyData from "../../components/no-data";
import "./../pages.css";

const ListPost = () => {
  const history = useHistory();
  const [allPost, setAllPost] = useState([]);
  const loginOk = useSelector((state) => state.loginReducer.login);

  useEffect(() => {
    getAllPost();
  }, []);

  useEffect(() => {
    if (!loginOk) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginOk]);

  const goToDetail = (id) => {
    history.push(`/postDetail/${id}`);
  };

  const getAllPost = async () => {
    const res = await Axios.get("https://gorest.co.in/public/v1/posts?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881");
    setAllPost(res.data.data);
  };

  const renderUsers = () => {
    return allPost?.map((post) => (
      <div className="col-md-6 mt-4 pointer" key={post.id} onClick={() => goToDetail(post.id)}>
        <div className="card-user">
          <div className="d-flex user-name">
            <Avatar className="avatar-user">
              <p>{post.user_id}</p>
            </Avatar>
            <div className="name">
              <p> User id</p>
            </div>
          </div>
          <Divider />
          <div className="post-desc">
            <p>{post.title}</p>
            <span>{post.body.length > 100 ? `${post.body.slice(0, 300)} ...` : post.body}</span>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item onClick={() => history.push(`/`)}>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active>All Post</Breadcrumb.Item>
        </Breadcrumb>
        {allPost.length ? <div className="row">{renderUsers()}</div> : <EmptyData />}
      </div>
    </div>
  );
};
export default ListPost;
