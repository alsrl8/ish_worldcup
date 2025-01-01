import { useEffect, useState } from "react";
import { Button, Col, message, Row } from "antd";
import {
  GetCandidates,
  GetCurrentRound,
  GetTotalRound,
  GoToNextRound,
  SelectWinner,
} from "../../../wailsjs/go/main/App";
import { base64ToFile } from "../../utils/base64";
import "./Tournament.css";
import CompareModal from "../../components/compare";
import { useLocation, useNavigate } from "react-router-dom"; // CSS 파일 추가

const Tournament = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentRound, setCurrentRound] = useState(1);
  const [totalRound, setTotalRound] = useState(1);
  const [leftImage, setLeftImage] = useState<File | undefined>(undefined);
  const [leftImageId, setLeftImageId] = useState<string | undefined>(undefined);
  const [rightImage, setRightImage] = useState<File | undefined>(undefined);
  const [rightImageId, setRightImageId] = useState<string | undefined>();
  const [leftSelected, setLeftSelected] = useState(false);
  const [rightSelected, setRightSelected] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  const roundSetting = () => {
    GetCurrentRound()
      .then((round) => setCurrentRound(round))
      .catch((err) => message.error(err));
    GetTotalRound()
      .then((round) => setTotalRound(round))
      .catch((err) => message.error(err));
  };

  useEffect(() => {
    roundSetting();
  }, []);

  useEffect(() => {
    GetCandidates().then((candidates) => {
      const processedImages = candidates.map((i) =>
        base64ToFile(i.data, i.name),
      );
      if (candidates.length === 1) {
        setLeftImage(processedImages[0]);
        setLeftImageId(candidates[0].id);
        setRightImage(undefined);
        setRightImageId(undefined);
        return;
      }

      setLeftImage(processedImages[0]);
      setLeftImageId(candidates[0].id);
      setRightImage(processedImages[1]);
      setRightImageId(candidates[1].id);
    });
  }, [currentRound]);

  const onClickSelect = (
    winnerId: string | undefined,
    loserId: string | undefined,
    setSelected: any,
  ) => {
    if (winnerId === undefined) {
      const _ = message.error("winner id is not set");
      return;
    }

    setSelected(true);
    setTimeout(() => {
      setSelected(false);
      SelectWinner(winnerId, loserId ? loserId : "")
        .then(() => {
          GoToNextRound()
            .then((isFinished) => {
              if (isFinished) {
                navigate("/result");
                return;
              }
              const _ = message.info("다음 라운드");
              roundSetting();
            })
            .catch((err) => message.error(err));
        })
        .catch((err) => message.error(err));
    }, 500);
  };

  return (
    <>
      <div>
        <Row justify="center" align="middle">
          <Col span={12}>
            <h1 style={{ fontFamily: "ONE Mobile POP", fontSize: "3vw" }}>
              Round {currentRound} of {totalRound}
            </h1>
          </Col>
        </Row>
        <Row justify="center" align="middle" style={{ marginTop: "2vw" }}>
          <Col span={11}>
            {leftImage && (
              <div
                className={`image-container ${leftSelected ? "selected" : ""}`}
                style={{
                  marginRight: "0.5vw",
                }}
              >
                <Button
                  style={{
                    fontFamily: "One Mobile POP",
                    fontSize: "2vw",
                    width: "100%",
                    height: "auto",
                    marginBottom: "1vh",
                  }}
                  onClick={() =>
                    onClickSelect(leftImageId, rightImageId, setLeftSelected)
                  }
                >
                  선택
                </Button>
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  src={URL.createObjectURL(leftImage)}
                  alt={leftImage.name}
                  onClick={() => {
                    setModalIndex(0);
                    setModalOpen(true);
                  }}
                />
                {leftSelected && <div className="check-overlay">✔</div>}
              </div>
            )}
          </Col>
          <Col span={11}>
            {rightImage && (
              <div
                className={`image-container ${rightSelected ? "selected" : ""}`}
                style={{
                  marginLeft: "0.5vw",
                }}
              >
                <Button
                  style={{
                    fontFamily: "One Mobile POP",
                    fontSize: "2vw",
                    width: "100%",
                    height: "auto",
                    marginBottom: "1vh",
                  }}
                  onClick={() =>
                    onClickSelect(rightImageId, leftImageId, setRightSelected)
                  }
                >
                  선택
                </Button>
                <img
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                  src={URL.createObjectURL(rightImage)}
                  alt={rightImage.name}
                  onClick={() => {
                    setModalIndex(1);
                    setModalOpen(true);
                  }}
                />
                {rightSelected && <div className="check-overlay">✔</div>}
              </div>
            )}
          </Col>
        </Row>
        <Row justify="center" align="middle" style={{ marginTop: "1vw" }}>
          <Col span={22}>
            <Button
              style={{
                width: "100%",
                height: "auto",
                fontFamily: "One Mobile POP",
                fontSize: "3vw",
              }}
              onClick={() => {
                setModalIndex(0);
                setModalOpen(true);
              }}
            >
              정밀 비교
            </Button>
          </Col>
        </Row>
      </div>
      <CompareModal
        isOpen={isModalOpen}
        setIsOpen={setModalOpen}
        leftImage={leftImage}
        rightImage={rightImage}
        selectedIndex={modalIndex}
      />
    </>
  );
};

export default Tournament;
