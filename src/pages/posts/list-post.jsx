import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import Axios from "axios";
import { Breadcrumb, Card, Modal, notification } from "antd";
import { Button, Label } from "reactstrap";
import { EditFilled, RestFilled, ExclamationCircleOutlined } from "@ant-design/icons";
import "./post.css";

function ListPosts() {
  const history = useHistory();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [modalEdit, setModalEdit] = useState(false);
  const [dataEdit, setDataEdit] = useState({});
  const [editIndex, setEditIndex] = useState([]);
  const [modalCreate, setModalCreate] = useState(false);
  const [createData, setCreateData] = useState({});
  const { confirm } = Modal;

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPosts = async () => {
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
    setPosts(res.data);
  };

  const deletePost = async (id) => {
    const res = await Axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (res.status === 200) {
      setPosts(posts.filter((post) => post.id !== id));
      notification["success"]({
        message: "Delete Success",
      });
    }
  };

  const editPost = async (payload) => {
    const res = await Axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, payload);
    if (res.status === 200) {
      let tempPost = [...posts];
      tempPost[editIndex] = payload;
      setPosts(tempPost);
      notification["success"]({
        message: "Edit Success",
      });
      setModalEdit(false);
    }
  };

  const createPost = async (payload) => {
    const res = await Axios.post(`https://jsonplaceholder.typicode.com/posts`, payload);
    if (res.status === 201) {
      let tempPost = [...posts];
      tempPost.unshift(res.data);
      setPosts(tempPost);
      notification["success"]({
        message: "Create Success",
      });
      setModalCreate(false);
    }
  };

  const goToDetail = (id) => {
    history.push(`/postDetail/${id}`);
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure delete this post?",
      icon: <ExclamationCircleOutlined />,
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        deletePost(id);
      },
    });
  };

  const showEditModal = (index) => {
    setModalEdit(true);
    setDataEdit(posts[index]);
    setEditIndex(index);
  };

  const showModalCreate = () => {
    setCreateData({
      title: "",
      body: "",
    });
    setModalCreate(true);
  };
  const onChangeDate = (e) => {
    const { name, value } = e.target;
    setDataEdit({ ...dataEdit, [name]: value });
  };

  const onChangeCreate = (e) => {
    const { name, value } = e.target;
    setCreateData({ ...createData, [name]: value });
  };

  const onSubmitClick = () => {
    let submitValue;
    if (modalEdit) {
      submitValue = { ...dataEdit, id: dataEdit.id, userId: dataEdit.userId };
      editPost(submitValue);
    } else if (modalCreate) {
      submitValue = { ...createData, userId: id };
      createPost(submitValue);
    }
  };

  const renderPosts = () =>
    posts?.map((post, index) => (
      <div className="col-md-12 mt-4">
        <Card className="card-detail">
          <div className="row">
            <div className="col-md-9" onClick={() => goToDetail(post.id)}>
              <h6>{post.title}</h6>
              <p>{post.body}</p>
            </div>
            <div className="col-md-3 d-flex justify-content-evenly action-icon">
              <EditFilled className="edit " onClick={() => showEditModal(index)} />
              <RestFilled className="delete" onClick={() => showDeleteConfirm(post.id)} />
            </div>
          </div>
        </Card>
      </div>
    ));

  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <a href="/">Users</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Posts</Breadcrumb.Item>
        </Breadcrumb>
        <div className="d-flex justify-content-right">
          <Button size="lg" className="create-post-btn" onClick={showModalCreate}>
            Create Post
          </Button>
        </div>
        <div className="row">{renderPosts()}</div>
      </div>
      <Modal title="Edit Post" visible={modalEdit} footer={false} onCancel={() => setModalEdit(false)}>
        <div className="mb-4">
          <Label className="mb-2">Title</Label>
          <input name="title" className="form-control" value={dataEdit?.title} onChange={onChangeDate} />
        </div>
        <div className="mb-4">
          <Label className="mb-2">Description</Label>
          <textarea name="body" className="form-control" value={dataEdit?.body} onChange={onChangeDate} />
        </div>
        <div className="d-flex justify-content-right">
          <Button className="space-btn" onClick={() => setModalEdit(false)}>
            cancel
          </Button>
          <Button color="primary" onClick={onSubmitClick}>
            Submit
          </Button>
        </div>
      </Modal>
      <Modal title="Create Post" visible={modalCreate} footer={false} onCancel={() => setModalCreate(false)}>
        <div className="mb-4">
          <Label className="mb-2">Title</Label>
          <input name="title" className="form-control" value={createData?.title} onChange={onChangeCreate} />
        </div>
        <div className="mb-4">
          <Label className="mb-2">Description</Label>
          <textarea name="body" className="form-control" value={createData?.body} onChange={onChangeCreate} />
        </div>
        <div className="d-flex justify-content-right">
          <Button className="space-btn" onClick={() => setModalCreate(false)}>
            cancel
          </Button>
          <Button color="primary" disabled={!createData.title || !createData.body} onClick={onSubmitClick}>
            Create
          </Button>
        </div>
      </Modal>
    </div>
  );
}
export default ListPosts;
