import React from "react";
import { useParams } from "react-router-dom";

function ListAlbums() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="main-container">list albums {id}</div>
    </div>
  );
}
export default ListAlbums;
