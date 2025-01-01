import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Result } from "antd";
import { GetFinalWinner } from "../../../wailsjs/go/main/App";
import { base64ToFile } from "../../utils/base64";

const FinalResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [winner, setWinner] = useState<File | undefined>(undefined);

  useEffect(() => {
    GetFinalWinner().then((winner) => {
      const processedImage = base64ToFile(winner.data, winner.name);
      setWinner(processedImage);
    });
  }, []);

  return (
    <Result
      style={{
        fontFamily: "ONE Mobile POP",
      }}
      status="success"
      title={<span style={{ fontSize: "5rem" }}>우승자가 정해졌습니다!</span>}
      subTitle={
        winner && (
          <span style={{ fontSize: "2rem" }}>파일 이름: {winner.name}</span>
        )
      }
      extra={[
        <Button
          style={{
            fontFamily: "ONE Mobile POP",
            fontSize: "2rem",
            width: "auto",
            height: "4vh",
          }}
          type="primary"
          key="restart"
          onClick={() => navigate("/")}
        >
          처음 화면으로
        </Button>,
      ]}
    >
      {winner && (
        <div style={{ textAlign: "center" }}>
          <img
            src={URL.createObjectURL(winner)}
            alt="Winner"
            style={{ maxWidth: "100%", height: "auto", marginTop: "20px" }}
          />
        </div>
      )}
    </Result>
  );
};

export default FinalResult;
