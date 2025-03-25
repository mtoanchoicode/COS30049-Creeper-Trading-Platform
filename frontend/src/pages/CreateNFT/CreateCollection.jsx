import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./CreateCollection.css";
import { Button, Form, Input, Upload, Image, message } from "antd";
import { UploadOutlined, PictureOutlined, InfoCircleOutlined } from "@ant-design/icons";


const CreateCollection = () => {
    const [fileList, setFileList] = useState();
    const [hovered, setHovered] = useState(false);
    // const [isUpload, setIsUpload] = useState(false);
    const isUpload = fileList && fileList.length > 0;


    // Handle File Upload Changes
    const handleChange = ({ fileList: newFileList }) => {
        setFileList(newFileList); // Update fileList state
    };

    // Handle File Removal
    const handleRemove = (file) => {
        setFileList((prevList) => prevList.filter((item) => item.uid !== file.uid));
    };

    // Handle File Preview
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

                        <div className="collection__image-conatainer"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(false)}>
                            <Form.Item
                                name="CollectionImage"
                                rules={[{ required: true, message: "Please upload your collection image!" }]}
                            >
                                <Upload
                                    className="collection__upload"
                                    accept="image/*"
                                    //showUploadList={true}
                                    beforeUpload={() => false} // Prevent auto-upload
                                    action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                    listType="picture"
                                    fileList={fileList}
                                    onChange={handleChange}
                                    onPreview={handlePreview}
                                    onRemove={handleRemove}
                                    maxCount={1}
                                >

                                    {!isUpload && (
                                        <div
                                            className="create-Image__detials">
                                            <div className="create-Image__icons">
                                                <span className={`icon ${hovered ? "slide-down" : "slide-up"}`}>
                                                    <PictureOutlined />
                                                </span>
                                                <span className={`icon ${hovered ? "slide-up" : "slide-down"}`}>
                                                    <UploadOutlined />
                                                </span>
                                            </div>
                                            <div className="create-Image__text">
                                                <h4>Drag and drop or click to upload</h4>
                                                <p>Recommended type: JPD, PNG, SVG, or GIF</p>
                                            </div>
                                        </div>
                                    )}
                                </Upload>
                            </Form.Item>
                        </div>

                        <div className="collection__details-container">
                            <div className="collection__details">
                                <div className="collection__form-header">
                                    <h4>Contract name</h4>
                                    <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                                </div>

                                <Form.Item
                                    name="collectionName"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input collection name!",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="collection__input"
                                        placeholder="My Collection Name" />
                                </Form.Item>
                            </div>

                            <div className="collection__details">
                                <div className="collection__form-header">
                                    <h4>Token symbol</h4>
                                    <Button type="primary" shape="circle" icon={<InfoCircleOutlined />} size={"small"} ></Button>
                                </div>

                                <Form.Item
                                    name="collectionSymbol"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please input collection symbol!",
                                        },
                                    ]}
                                >
                                    <Input
                                        className="collection__input"
                                        placeholder="MCN" />
                                </Form.Item>
                            </div>
                        </div>


                        <Form.Item >
                            <Button className="collection__button-submit" type="primary" htmlType="submit">
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

