import React from "react";
import noData from "./../assets/no-data.png";
import "./component.css";

export default function LoadingComponent() {
  return (
    <div className="no-data">
      <img src={noData} alt="empty data" style={{ height: "200px" }} />
    </div>
  );
}
