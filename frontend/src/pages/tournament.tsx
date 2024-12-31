import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Row, Col } from 'antd';

const Tournament = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const images = location.state?.images || []; // Retrieve uploaded images from state

    const [currentRound, setCurrentRound] = useState(images);
    const [nextRound, setNextRound] = useState<File[]>([]);
    const [index, setIndex] = useState(0);

    const handleSelect = (winner: File) => {
        setNextRound((prev) => [...prev, winner]);

        if (index + 2 >= currentRound.length) {
            if (nextRound.length === 1) {
                navigate('/result', { state: { winner: nextRound[0] } });
            } else {
                setCurrentRound(nextRound);
                setNextRound([]);
                setIndex(0);
            }
        } else {
            setIndex((prev) => prev + 2);
        }
    };

    if (currentRound.length === 0) {
        return <div>No images available. Please upload files from the home page.</div>;
    }

    return (
        <div style={{ padding: 20 }}>
            <Row gutter={16} justify="center">
                <Col span={8}>
                    {currentRound[index] && (
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="Image 1"
                                    src={URL.createObjectURL(currentRound[index])}
                                />
                            }
                            onClick={() => handleSelect(currentRound[index])}
                        >
                            Select
                        </Card>
                    )}
                </Col>
                <Col span={8}>
                    {currentRound[index + 1] && (
                        <Card
                            hoverable
                            cover={
                                <img
                                    alt="Image 2"
                                    src={URL.createObjectURL(currentRound[index + 1])}
                                />
                            }
                            onClick={() => handleSelect(currentRound[index + 1])}
                        >
                            Select
                        </Card>
                    )}
                </Col>
            </Row>
        </div>
    );
};

export default Tournament;
