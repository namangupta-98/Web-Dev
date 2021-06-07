import { Card, Tooltip, notification } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined
} from "@ant-design/icons";
import React from "react";
import { deleteFile, downloadFile } from "../actions/file";
import { getCookie } from "../actions/auth";
import fileDownload from "js-file-download";

const { Meta } = Card;

const File = ({ file, setValues }) => {
  const token = getCookie("token");

  const item = () => {
    if(file.mimetype.includes("image")){
      return <img src={`http://localhost:8000/${file.username + "/" + file.name}`} alt="file" height="150px" style={{objectFit: "contain",
            overflow: "hidden"}}/>
    }else if(file.mimetype.includes("video")){
      return <video controls src={`http://localhost:8000/${file.username + "/" + file.name}`} style={{objectFit: "contain",
      overflow: "hidden"}}></video>
    }else{
      return <img src="/file-svg.svg" alt="file" height="150px" style={{objectFit: "contain",
            overflow: "hidden"}}/>
    }
  }

  const openNotification = (data) => {
    const args = {
      message: data,
      duration: 4.5,
    };
    notification.open(args);
  };

  const onDelete = async () => {
    await deleteFile(file.name, token).then(async (data) => {
      if(data.error){
        openNotification(data.error);
      }else{
        openNotification(file.name + " deleted");
        setValues(data.files);
      }
    })
  }

  const onDownload = async () => {
    if(process.browser) {
    let user = JSON.parse(localStorage.getItem("user"));
    await downloadFile(file.name, user.username).then(async (res) => {
        await fileDownload(res, file.name)
    })}
  }

  return (
    <>
      <Card
        style={{ textAlign: "center" }}
        cover={item()}
        hoverable
        actions={[
          <Tooltip placement="top" title="Delete"><DeleteOutlined key="delete" onClick={() => onDelete()} /></Tooltip>,
          <Tooltip placement="top" title="Edit"><EditOutlined key="edit" /></Tooltip>,
          <Tooltip placement="top" title="Download"><DownloadOutlined key="download" onClick={() => onDownload()} /></Tooltip>,
        ]}
      >
        <Meta title={file.name} />
      </Card>
    </>
  );
};

export default File;
