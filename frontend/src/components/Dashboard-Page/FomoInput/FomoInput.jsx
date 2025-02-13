import React from "react";
import "./FomoInput.css";
import { Button, Form, Input } from "antd";

const onFinish = async (values) => {
    console.log("Success:", values);
};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};


const FomoInput = () => {
  return (
    <section className = "FomoInput-Container" >
        <div className= "FomoInput_heading-Container">
            <h1>Let's be fomo !</h1>
        </div>

        <div className="Fomo_SignUpForm-Container">
            <Form 
                layout = "horizontal"
                name = "login"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                className="Fomo_SignUpForm"
            >
                <Form.Item
                className="Fomo_Input_Container"
                name="email"
                rules={[
                {
                required: true,
                message: "Please input your email!",
                },
                ]}>
                    <Input
                        className="Fomo-SignUp_Input"
                        placeholder="Email/Phone number"
                    />
                </Form.Item>

                <Form.Item
                    className="Fomo_Button_Container"
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="Fomo-SignUp_Button"
                        > <i className="fa-solid fa-arrow-right"></i>
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </section>
  )
};

export default FomoInput;
