import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useParams } from "react-router-dom";
import { Breadcrumb, Image } from "antd";
import "./list.css";

function ListPhotoOfAlbum() {
  const { id } = useParams();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    getPhotos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPhotos = async () => {
    const res = await Axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
    setPhotos(res.data);
  };

  const renderPhotos = () =>
    photos?.map((album) => (
      <div className="col-md-3 mt-4">
        <Image width={200} src={album.url} title={"asas"} />
      </div>
    ));
  return (
    <div className="container">
      <div className="main-container">
        <Breadcrumb separator=">">
          <Breadcrumb.Item>
            <a href="/">Users</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item onClick={() => window.history.back()}>Albums</Breadcrumb.Item>
          <Breadcrumb.Item active>Photos</Breadcrumb.Item>
        </Breadcrumb>
        <div className="row">{renderPhotos()}</div>
      </div>
    </div>
  );
}
export default ListPhotoOfAlbum;
