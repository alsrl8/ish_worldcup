import { useEffect, useState } from "react";
import {
  DeleteImage,
  GetImageList,
  GetImageNum,
} from "../../wailsjs/go/main/App";
import { Button, List, message, Pagination } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
import { base64ToFile } from "../utils/base64";

const UploadedImages = (props: { flag: boolean }) => {
  const [totalImageNum, setTotalImageNum] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);
  const [imageIds, setImageIds] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);

  useEffect(() => {
    GetImageNum()
      .then((num) => {
        setTotalImageNum(num);
        if (num < 10) {
          setPerPage(num);
        } else {
          setPerPage(10);
        }
        setPage(1);
      })
      .catch((err) => message.error(err));
  }, [props.flag]);

  useEffect(() => {
    if (totalImageNum < 1) {
      setImages([]);
      return;
    }

    GetImageList(page, perPage)
      .then((_images) => {
        const processedImages = _images.map((i) => {
          return base64ToFile(i.data, i.name);
        });
        setImages(processedImages);

        const imageIds = _images.map((i) => i.id);
        setImageIds(imageIds);
      })
      .catch((err) => message.error(err));
  }, [totalImageNum, page, perPage]);

  const handleDelete = (id: string) => {
    DeleteImage(id)
      .then(() => {
        GetImageNum()
          .then((num) => {
            setTotalImageNum(num);
          })
          .catch((err) => message.error(err));
      })
      .catch((err) => message.error(err));
  };

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h3 style={{ fontFamily: "ONE Mobile POP" }}>총 {totalImageNum} 장</h3>
        <Pagination
          defaultCurrent={1}
          total={totalImageNum}
          onChange={setPage}
          current={page}
        />
      </div>
      <List
        itemLayout="horizontal"
        dataSource={images}
        renderItem={(image, index) => (
          <List.Item>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <h5 style={{ flex: 2, marginRight: "10px" }}>{image.name}</h5>
                <img
                  src={URL.createObjectURL(image)}
                  alt={image.name}
                  style={{
                    flex: 8,
                    width: "20vh",
                    height: "20vh",
                    objectFit: "cover",
                    marginRight: "10px",
                  }}
                />
              </div>
              <Button
                type="text"
                icon={
                  <CloseCircleFilled
                    style={{ color: "#E57373", fontSize: "16px" }}
                  />
                }
                style={{
                  marginLeft: "auto",
                  height: "fit-content", // 버튼 높이 최소화
                }}
                onClick={() => handleDelete(imageIds[index])}
              />
            </div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default UploadedImages;
