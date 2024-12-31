import React from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {Button, Result} from 'antd';

const FinalResult = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const winner: File | undefined = location.state?.winner;

    if (!winner) {
        return (
            <Result
                status="error"
                title="No Winner Found"
                subTitle="It seems like no winner was determined. Please restart the tournament."
                extra={[
                    <Button type="primary" key="home" onClick={() => navigate('/')}>
                        Back to Home
                    </Button>,
                ]}
            />
        );
    }

    return (
        <Result
            status="success"
            title="We Have a Winner!"
            subTitle={`Your ideal choice has been determined.`}
            extra={[
                <Button type="primary" key="restart" onClick={() => navigate('/')}>
                    Restart Tournament
                </Button>,
            ]}
        >
            <div style={{textAlign: 'center'}}>
                <img
                    src={URL.createObjectURL(winner)} // Convert the File object to a usable URL
                    alt="Winner"
                    style={{maxWidth: '100%', height: 'auto', marginTop: '20px'}}
                />
            </div>
        </Result>
    );
};

export default FinalResult;
