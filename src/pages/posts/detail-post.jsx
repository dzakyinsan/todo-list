import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { Breadcrumb, BreadcrumbItem, Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle, Button } from "reactstrap";
import Axios from "axios";
import "./../pages.css";

function DetailPosts() {
  const { id } = useParams();
  const history = useHistory();
  const [detail, setDetail] = useState([]);
  const [comments, setComments] = useState([]);

  const getDetail = async () => {
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setDetail(res.data);
  };
  const getComments = async () => {
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    setComments(res.data);
  };

  //   const onDeleteComment = async () => {
  //     const res = await Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
  //     setComments(res.data);
  //   };

  useEffect(() => {
    getDetail();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log("comments", comments);
  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb>
          <BreadcrumbItem active>
            <a href="/">Dashboard</a>
          </BreadcrumbItem>
          <BreadcrumbItem active onClick={() => window.history.back()}>
            Posts
          </BreadcrumbItem>
          <BreadcrumbItem active>Detail</BreadcrumbItem>
        </Breadcrumb>
        <div>
          <Card>
            <CardBody>
              <CardTitle tag="h5">{detail.title}</CardTitle>
            </CardBody>
            comments
            {comments?.map((val) => (
              <Card>
                {val.body}
                {/* <Button onClick={() => onDeleteComment(val.id)}>albums</Button> */}
              </Card>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}
export default DetailPosts;
