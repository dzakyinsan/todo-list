import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Card, Comment, Tooltip, Avatar, Divider, Input, Form, Button, Modal, notification } from "antd";
import { Button as ModalButton } from "reactstrap";
import { EditOutlined, RestOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import Axios from "axios";
import dayjs from "dayjs";
import "./../pages.css";

function DetailPosts() {
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
  const [editIndex, setEditIndex] = useState([]);

  const { name, email, body } = dataAdd;

  useEffect(() => {
    getDetail();
    getComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDetail = async () => {
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
    setDetail(res.data);
  };

  const getComments = async () => {
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
    setComments(res.data);
  };

  const editComment = async () => {
    const payload = { ...dataEdit, id: dataEdit.id, userId: dataEdit.userId };
    const res = await Axios.put(`https://jsonplaceholder.typicode.com/comments/${id}`, payload);
    if (res.status === 200) {
      let tempComments = [...comments];
      tempComments[editIndex] = payload;
      setComments(tempComments);
      notification["success"]({
        message: "Edit Success",
      });
      setModalEdit(false);
    }
  };

  const deleteComment = async (id) => {
    const res = await Axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`);
    if (res.status === 200) {
      setComments(comments.filter((comment) => comment.id !== id));
      notification["success"]({
        message: "Delete Success",
      });
    }
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
    setEditIndex(index);
  };

  const createComments = async (payload) => {
    setLoadingAdd(true);
    const res = await Axios.post(`https://jsonplaceholder.typicode.com/comments`, payload);
    if (res.status === 201) {
      let tempComment = [...comments];
      tempComment.push(res.data);
      setComments(tempComment);
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
    let submitValue = { ...dataAdd, postId: id };
    createComments(submitValue);
  };

  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <a href="/">Users</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active onClick={() => window.history.back()}>
            Posts
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Detail</Breadcrumb.Item>
        </Breadcrumb>

        <div>
          <Card className="mt-4 mb-3">
            <h1>{detail.title}</h1>
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
                datetime={<span style={{ fontSize: "15px" }}>{dayjs().format("DD/MM/YYYY HH:mm:ss")}</span>}
              />
            ))}
            <Comment
              className="mt-5"
              avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
              content={
                <>
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
                    <Button loading={loadingAdd} onClick={handleSubmit} type="primary" disabled={!name || !email || !body} style={{ height: "50px" }}>
                      Add Comment
                    </Button>
                  </Form.Item>
                </>
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
