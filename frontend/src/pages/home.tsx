import React, { useState } from 'react';
import { Upload, Button, List } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import {RcFile} from "antd/es/upload";

const Home = () => {
    const [fileList, setFileList] = useState<File[]>([]);
    const navigate = useNavigate();

    const handleUpload = (file: RcFile, fileList:RcFile[]) => {
        setFileList((prev) => [...prev, file]);
        return false; // Prevent automatic upload
    };

    const handleStart = () => {
        if (fileList.length >= 2) {
            navigate('/tournament', { state: { images: fileList } });
        } else {
            alert('Please upload at least two pictures to start the tournament.');
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <Upload
                accept="image/jpg, image/jpeg, image/png"
                beforeUpload={handleUpload}
                multiple
                showUploadList
            >
                <Button icon={<UploadOutlined />}>Add Pictures</Button>
            </Upload>
            <List
                bordered
                style={{ marginTop: 20 }}
                dataSource={fileList.map((file) => file.name)}
                renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Button
                type="primary"
                style={{ marginTop: 20 }}
                disabled={fileList.length < 2}
                onClick={handleStart}
            >
                Start Tournament
            </Button>
        </div>
    );
};

export default Home;
