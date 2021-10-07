import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router";
import { Breadcrumb, Card } from "antd";
import AlbumImage from "./../../assets/albums.jpg";
import "./list.css";

function ListAlbums() {
  const history = useHistory();
  const { id } = useParams();
  const { Meta } = Card;

  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    getAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gotToPhotos = (id) => {
    history.push(`/listPhoto/${id}`);
  };

  const getAlbums = async () => {
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
    setAlbums(res.data);
  };

  const renderAlbums = () =>
    albums?.map((album) => (
      <div className="col-md-4 mt-4">
        <Card hoverable cover={<img alt="example" src={AlbumImage} onClick={() => gotToPhotos(album.id)} />}>
          <Meta title={album.title} />
        </Card>
        ,
      </div>
    ));
  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <a href="/">Users</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>Albums</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">{renderAlbums()}</div>
      </div>
    </div>
  );
}
export default ListAlbums;
