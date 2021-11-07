import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Breadcrumb, Card, notification, Tooltip, DatePicker, Input, Button } from "antd";
import { MinusSquareFilled, RestFilled, CheckSquareFilled } from "@ant-design/icons";
import Axios from "axios";
import Swal from "sweetalert2";
import dayjs from "dayjs";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import EmptyData from "../../components/no-data";
import "./todos.css";

function ListPosts() {
  const history = useHistory();

  const { idParams } = useParams();
  const [todos, setTodos] = useState([]);
  const [createData, setCreateData] = useState({
    title: "",
    due_on: "",
  });
  const loginOk = useSelector((state) => state.loginReducer.login);

  useEffect(() => {
    getListTodo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loginOk) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginOk]);

  const getListTodo = async () => {
    const res = await Axios.get(`https://gorest.co.in/public/v1/users/${idParams}/todos`);
    const sortTodo = res.data.data.sort((a, b) => b.id - a.id);
    setTodos(sortTodo);
  };

  const deleteTodo = async (id) => {
    const res = await Axios.delete(`https://gorest.co.in/public/v1/todos/${id}?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`);
    if (res.status === 204) {
      getListTodo();
      notification["success"]({
        message: "Delete Success",
      });
    }
  };

  const editStatus = async (post) => {
    const payload = { status: `${post.status === "pending" ? "completed" : "pending"}` };
    const res = await Axios.put(`https://gorest.co.in/public/v1/todos/${post.id}?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`, payload);
    if (res.data.data) {
      getListTodo();
      notification["success"]({
        message: "status changed",
      });
    }
  };

  const createTodo = async (payload) => {
    const res = await Axios.post(`https://gorest.co.in/public/v1/todos?access-token=997ebb80e95534401062db954c8bc89b54cb426132910c18378fc9d495923881`, payload);
    if (res.data.data) {
      getListTodo();
      notification["success"]({
        message: "Create Success",
      });
      setCreateData({
        title: "",
        due_on: "",
      });
    }
  };

  const showDeleteConfirm = (id) => {
    Swal.fire({
      title: `Are you sure delete this post?`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteTodo(id);
      }
    });
  };

  const showEditModal = (post) => {
    Swal.fire({
      title: `Change status to ${post?.status === "pending" ? "Completed" : "Pending"}`,
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        editStatus(post);
      }
    });
  };

  const onChangeCreate = (e) => {
    const { name, value } = e.target;
    setCreateData({ ...createData, [name]: value });
  };

  const onChangeDate = (date, dateString) => {
    setCreateData({ ...createData, due_on: date });
  };

  const onSubmitClick = () => {
    let submitValue = {
      ...createData,
      user_id: idParams,
      status: "pending",
    };
    createTodo(submitValue);
  };

  const renderTodos = () =>
    todos?.map((todo, index) => (
      <div className="col-md-12 mt-2">
        <Card className="card-detail">
          <div className="row">
            <div className="each-todo col-md-9">
              <h6>{todo.title}</h6>
              <span>{dayjs(todo.due_on).format("DD/MM/YYYY")}</span>
            </div>
            <div className="col-md-3 d-flex justify-content-evenly action-icon">
              {todo.status === "pending" ? (
                <Tooltip title={todo.status}>
                  <MinusSquareFilled className="pending" onClick={() => showEditModal(todo)} />
                </Tooltip>
              ) : (
                <Tooltip title={todo.status}>
                  <CheckSquareFilled className="completed" onClick={() => showEditModal(todo)} />
                </Tooltip>
              )}
              <Tooltip title="delete">
                <RestFilled className="delete" onClick={() => showDeleteConfirm(todo.id)} />
              </Tooltip>
            </div>
          </div>
        </Card>
      </div>
    ));

  return (
    <div className="container pb-5">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item onClick={() => history.push(`/`)}>Dashboard</Breadcrumb.Item>
          <Breadcrumb.Item active>Todo</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row mt-5">
          <div className="col-5">
            <Input name="title" placeholder="Todo Title" size="large" className="date-picker" value={createData.title} onChange={onChangeCreate} />
          </div>
          <div className="col-4">
            <DatePicker className="date-picker" size="large" onChange={onChangeDate} value={createData.due_on} />
          </div>
          <div className="col-3">
            <Button size="large" className="create-post-btn" disabled={!createData.title || !createData.due_on} onClick={onSubmitClick}>
              Add
            </Button>
          </div>
        </div>
        {todos.length ? (
          <div className="row mt-3">{renderTodos()}</div>
        ) : (
          <div>
            <EmptyData />
          </div>
        )}
      </div>
    </div>
  );
}
export default ListPosts;
