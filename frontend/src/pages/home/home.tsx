import React, { useEffect, useState } from "react";
import { Button, Menu, message, Modal, Upload } from "antd";
import { MenuUnfoldOutlined, UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { RcFile } from "antd/es/upload";
import "./home.css";
import UploadedImages from "../../components/uploadedImages";
import {
  AddImage,
  GetImageNum,
  StartTournament,
} from "../../../wailsjs/go/main/App";

const Home = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
  const menuRef = React.createRef<HTMLDivElement>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [addImageFlag, setAddImageFlag] = useState(false);
  const navigate = useNavigate();

  let messageTimeout: number | null = null;
  let errorTimeout: number | null = null;

  const showMessage = (msg: string) => {
    if (messageTimeout !== null) return;

    const _ = message.success(msg);
    setTimeout(() => {
      messageTimeout = null;
    }, 1000);
    messageTimeout = 1;
  };

  const showError = (errMsg: string) => {
    if (errorTimeout !== null) return;

    const _ = message.error(errMsg);
    setTimeout(() => {
      errorTimeout = null;
    }, 1000);
    errorTimeout = 1;
  };

  const handleUpload = (file: RcFile, fileList: RcFile[]) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (!reader.result) {
        showError("Error reading file");
        return;
      }

      AddImage(file.name, reader.result as string)
        .then((res) => {
          showMessage(res);
          setAddImageFlag(!addImageFlag);
        })
        .catch((err) => {
          showError(err);
        });
    };

    reader.onerror = () => {
      showError("Error reading file");
    };

    reader.readAsDataURL(file); // Convert to Base64
    return false;
  };

  const onClickMenuButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    setMenuVisible(!menuVisible);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    if (menuVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuVisible]);

  const handleStart = () => {
    GetImageNum().then((num) => {
      if (num < 2) {
        showError("최소 2장 이상 사진을 선택한 뒤에 시작할 수 있습니다.");
        return;
      }
      StartTournament()
        .then(() => navigate("/tournament", { state: {} }))
        .catch((err) => showError(err));
    });
  };

  const onClickMenu1 = () => {
    setMenuVisible(false);
    setModalOpen(true);
  };

  const menu = (
    <Menu
      style={{
        fontFamily: "ONE Mobile POP",
        width: "20vw",
        borderRadius: "8px",
      }}
      mode="vertical"
    >
      <Menu.Item key="1" onClick={onClickMenu1}>
        저장된 사진 목록
      </Menu.Item>
    </Menu>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        gap: "2px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Button
            type="primary"
            style={{ marginRight: 5, padding: 50 }}
            icon={<MenuUnfoldOutlined style={{ fontSize: "2rem" }} />}
            onClick={onClickMenuButton}
          />
          <Upload
            accept="image/jpg, image/jpeg, image/png"
            beforeUpload={handleUpload}
            multiple
            showUploadList={false}
          >
            <Button
              type="primary"
              icon={<UploadOutlined />}
              style={{
                fontFamily: "ONE Mobile POP",
                fontSize: "2rem",
                padding: 50,
              }}
            >
              사진 추가
            </Button>
          </Upload>
        </div>
        <Button
          type="primary"
          style={{
            fontSize: "2rem",
            paddingLeft: 38,
            paddingRight: 38,
            paddingTop: 30,
            paddingBottom: 30,
            fontFamily: "ONE Mobile POP",
          }}
          onClick={handleStart}
        >
          Start Tournament
        </Button>
      </div>
      {/*메뉴 팝업*/}
      <div
        ref={menuRef}
        className={`menu-popup ${menuVisible ? "visible" : ""}`}
        style={{
          position: "absolute",
          top: menuPosition.y,
          left: menuPosition.x,
          zIndex: 1000,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          background: "#fff",
          borderRadius: "4px",
        }}
      >
        {menu}
      </div>

      {/* 파일 모달 */}
      <Modal
        open={isModalOpen}
        onCancel={() => setModalOpen(false)}
        closable={false}
        footer={null}
        maskClosable={true}
        centered
      >
        <UploadedImages flag={addImageFlag} />
      </Modal>
    </div>
  );
};

export default Home;
