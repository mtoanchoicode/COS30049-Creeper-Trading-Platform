import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateCollection.css";
import { Button, Form, Input, Upload, Image, message } from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";


const CreateCollection = () => {
    const [imageUrl, setImageUrl] = useState();
    const [fileList, setFileList] = useState([]);


    // Handle File Upload Changes
    const handleChange = ({ fileList: newFileList }) => {
        // if (file.status === "done") {
        //     message.success(`${file.name} uploaded successfully.`);
        // } else if (file.status === "error") {
        //     message.error(`${file.name} upload failed.`);
        // }
        setFileList(newFileList); // Update fileList state
    };


    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.body.appendChild(image.outerHTML);
    };

    // Handle File Preview
    //  const handlePreview = async (file) => {
    //     let src = file.url || URL.createObjectURL(file.originFileObj);
    //     const imgWindow = window.open(src);
    //     imgWindow?.document.write(`<img src="${src}" width="100%" />`);
    // };

    // Handle File Removal
    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    };

    const handlePreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.body.appendChild(image.outerHTML);
    };



    const handleImageUpload = (info) => {
        if (info.file.status === "done" || info.file.originFileObj) {
            const url = URL.createObjectURL(info.file.originFileObj);
            setImageUrl(url);
        }
    };

    return (
        <section className="create-collection">
            <div className="create-collection__container">
                <div className="create-collection__header">
                    <h2>First, you’ll need to create a collection for your NFT</h2>
                    <p>You’ll need to deploy an ERC-721 contract on the blockchain to create a collection for your NFT.
                        <a href="https://opensea.io/learn/blockchain/what-is-a-smart-contract"> What is a contract?</a>
                    </p>
                </div>

                <div className="create-collection__form-container">
                    <Form
                        className="create-collection__form">
                        <div className="collection__form-header">
                            <h4>Logo Image</h4>
                            <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                        </div>

                        <Form.Item
                            label="Collection Image"
                            name="collectionImage"
                            rules={[{ required: true, message: "Please upload your collection image!" }]}
                        >
                            <Upload
                                accept="image/*"
                                //listType="picture"
                                showUploadList={true}
                                beforeUpload={() => false} // Prevent auto-upload
                                //onChange={handleImageUpload}
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-card"
                                fileList={fileList}
                                onChange={handleChange}
                                onPreview={handlePreview}
                                onRemove={handleRemove}
                            >
                                {/* <Button icon={<UploadOutlined />}>Upload Image</Button> */}
                                {fileList.length < 5 && '+ Upload'}
                            </Upload>

                            {/* {imageUrl && (
                                <Image
                                    width={200}
                                    src={imageUrl}
                                    alt="Collection Preview"
                                />
                            )} */}
                        </Form.Item>

                        <Form.Item
                            label="Collection Name"
                            name="collectionName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your collection name!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Collection Description"
                            name="collectionDescription"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your collection description!",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Create Collection
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </section>
    )
};

export default CreateCollection;



const App = () => {
    const [fileList, setFileList] = useState([]);

    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };
    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.body.appendChild(image.outerHTML);
    };


    const handlePreview = async (file) => {
        let src = file.url || URL.createObjectURL(file.originFileObj);

        // Open the image in a new tab properly
        const imgWindow = window.open("", "_blank");
        imgWindow.document.write(`
        <html>
            <head><title>Image Preview</title></head>
            <body style="margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#000;">
                <img src="${src}" style="max-width:90%;max-height:90vh;border-radius:10px;" />
            </body>
        </html>
    `);
    };

    return (
        <Form>
            <Form.Item
                label="Collection Image"
                name="collectionImage"
                rules={[{ required: true, message: "Please upload your collection image!" }]}  >
                <Upload
                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                    listType="picture-card"
                    onChange={onChange}
                    onPreview={onPreview}
                >
                    {fileList.length < 5 && '+ Upload'}
                </Upload>
            </Form.Item>
        </Form>


    );
};


