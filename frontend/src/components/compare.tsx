import { Modal } from "antd";
import { useEffect, useState } from "react";

interface CompareModalProps {
  selectedIndex: number;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  leftImage: File | undefined;
  rightImage: File | undefined;
}

const CompareModal = (props: CompareModalProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [leftImageUrl, setLeftImageUrl] = useState<string | undefined>(
    undefined,
  );
  const [rightImageUrl, setRightImageUrl] = useState<string | undefined>(
    undefined,
  );

  useEffect(() => {
    setImageIndex(0);

    if (props.leftImage) {
      setLeftImageUrl(URL.createObjectURL(props.leftImage));
    }
    if (props.rightImage) {
      setRightImageUrl(URL.createObjectURL(props.rightImage));
    }

    return () => {
      if (leftImageUrl) URL.revokeObjectURL(leftImageUrl);
      if (rightImageUrl) URL.revokeObjectURL(rightImageUrl);
    };
  }, [props.isOpen, props.leftImage, props.rightImage]);

  useEffect(() => {
    setImageIndex(props.selectedIndex);
  }, [props.selectedIndex]);

  return (
    <Modal
      open={props.isOpen}
      onCancel={() => props.setIsOpen(false)}
      closable={false}
      footer={null}
      maskClosable={true}
      centered
      bodyStyle={{
        padding: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      width="80%"
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
        onClick={() => setImageIndex((imageIndex + 1) % 2)}
      >
        <div
          style={{
            position: "absolute",
            top: "2vh",
            left: "2vw",
            fontSize: "5vw",
            fontWeight: "bold",
            color: "white",
            zIndex: 10,
          }}
        >
          {imageIndex === 0 ? "왼쪽" : "오른쪽"}
        </div>

        {imageIndex === 0 && leftImageUrl && (
          <img
            src={leftImageUrl}
            alt={props.leftImage?.name}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
        {imageIndex === 1 && rightImageUrl && (
          <img
            src={rightImageUrl}
            alt={props.rightImage?.name}
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        )}
      </div>
    </Modal>
  );
};

export default CompareModal;
