import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { Breadcrumb, Card, Comment, Tooltip, Avatar, Divider, Input, Form, Button, Modal, notification } from "antd";
import { Button as ModalButton } from "reactstrap";
import { EditOutlined, RestOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Axios from "axios";
import { useSelector } from "react-redux";
import "./../pages.css";

function DetailPosts() {
  const history = useHistory();
  const { id } = useParams();
  const { TextArea } = Input;
  const { confirm } = Modal;

  const [detail, setDetail] = useState([]);
  const [comments, setComments] = useState([]);
  const [dataAdd, setDataAdd] = useState({
    name: "",
    email: "",
    body: "",
  });
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const loginOk = useSelector((state) => state.loginReducer.login);

  const { name, email, body } = dataAdd;

  useEffect(() => {
    getDetail();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loginOk) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginOk]);

  const getDetail = async () => {
    const res = await Axios.get(`https://gorest.co.in/public/v1/posts/${id}?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`);
    setDetail(res.data.data);
  };

  const getComments = async () => {
    const res = await Axios.get(`https://gorest.co.in/public/v1/posts/${id}/comments?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`);
    setComments(res.data.data.sort((a, b) => b.id - a.id));
  };

  const editComment = async () => {
    const res = await Axios.put(`https://gorest.co.in/public/v1/comments/${dataEdit.id}?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`, dataEdit);
    if (res.data) {
      getComments();
      notification["success"]({
        message: "Edit Success",
      });
      setModalEdit(false);
    }
  };

  const deleteComment = async (id) => {
    await Axios.delete(`https://gorest.co.in/public/v1/comments/${id}?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`);
    getComments();
    notification["success"]({
      message: "Delete Success",
    });
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this comments?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deleteComment(id);
      },
    });
  };

  const showEditModal = (index) => {
    setModalEdit(true);
    setDataEdit(comments[index]);
  };

  const createComments = async (payload) => {
    setLoadingAdd(true);
    try {
      const res = await Axios.post(`https://gorest.co.in/public/v1/posts/${id}/comments?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`, payload);
      if (res.data) {
        getComments();
        notification["success"]({
          message: "Create Success",
        });
        setLoadingAdd(false);
        setDataAdd({
          name: "",
          email: "",
          body: "",
        });
      }
    } catch (error) {
      getComments();
      notification["error"]({
        message: "your email is invalid",
      });
      setLoadingAdd(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataAdd({ ...dataAdd, [name]: value });
  };

  const handleEdit = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  };

  const handleSubmit = () => {
    let submitValue = { ...dataAdd, post_id: +id };
    createComments(submitValue);
  };

  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item onClick={() => history.push(`/`)}>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active onClick={() => window.history.back()}>
            All Posts
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Detail Post</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Card className="mt-4 mb-3">
            <h2>{detail.title}</h2>
            <p>{detail.body}</p>
          </Card>
          <Card>
            <h5>Comments</h5>
            <Divider />
            {comments?.map((comment, index) => (
              <Comment
                className="comment-detail"
                actions={[
                  <Tooltip key="comment-basic-like" title="edit">
                    <span className="space-between" onClick={() => showEditModal(index)}>
                      <EditOutlined />
                    </span>
                  </Tooltip>,
                  <Tooltip key="comment-basic-dislike" title="delete">
                    <span onClick={() => showDeleteConfirm(comment.id)}>
                      <RestOutlined />
                    </span>
                  </Tooltip>,
                ]}
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                author={<a>{comment.name}</a>}
                avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="avatar" />}
                content={<p>{comment.body}</p>}
                datetime={<span style={{ fontSize: "15px" }}>{comment.email}</span>}
              />
            ))}
            <Comment
              className="mt-5"
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
              content={
                <Form onFinish={handleSubmit}>
                  <Form.Item>
                    <Input name="name" onChange={handleChange} value={name} placeholder="name" />
                  </Form.Item>
                  <Form.Item>
                    <Input name="email" onChange={handleChange} value={email} placeholder="email" />
                  </Form.Item>
                  <Form.Item>
                    <TextArea name="body" rows={4} onChange={handleChange} value={body} placeholder="comment" />
                  </Form.Item>
                  <Form.Item>
                    <Button htmlType="submit" loading={loadingAdd} type="primary" disabled={!name || !email || !body} style={{ height: "50px" }}>
                      Add Comment
                    </Button>
                  </Form.Item>
                </Form>
              }
            />
          </Card>
        </div>
      </div>
      <Modal title="Edit Post" visible={modalEdit} footer={false} onCancel={() => setModalEdit(false)}>
        <div className="mb-4">
          <p className="mb-2">name</p>
          <input name="name" className="form-control" value={dataEdit?.name} onChange={handleEdit} />
        </div>
        <div className="mb-4">
          <p className="mb-2">email</p>
          <input name="email" className="form-control" value={dataEdit?.email} onChange={handleEdit} />
        </div>
        <div className="mb-4">
          <p className="mb-2">comment</p>
          <textarea name="body" className="form-control" value={dataEdit?.body} onChange={handleEdit} />
        </div>
        <div className="d-flex justify-content-right">
          <ModalButton className="space-btn" onClick={() => setModalEdit(false)}>
            cancel
          </ModalButton>
          <ModalButton color="primary" onClick={editComment}>
            Submit
          </ModalButton>
        </div>
      </Modal>
    </div>
  );
}
export default DetailPosts;
