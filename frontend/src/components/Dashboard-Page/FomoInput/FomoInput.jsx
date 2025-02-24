import React from "react";
import "./FomoInput.css";
import { Button, Form, Input } from "antd";

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};


const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const onFinish = async (values) => {
    const requestBody = JSON.stringify({ email: values.email.trim() });

    try {
        const response = await fetch(`${API_BASE_URL}/v1/api/mail/subscribe`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: values.email }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(`${data.message}`);
        } else {
            alert(`${data.message}`);
        }

    } catch (error) {
        alert("An error occurred. Please try again.");
    }
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
                name = "Sign Up Email"
                initialValues={{ email: "" }}
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
