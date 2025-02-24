import React from "react";
import "./FomoInput.css";
import { Button, Form, Input } from "antd";

const onFinish = async (values) => {
    console.log("Success:", values);
};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};


// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// const onFinish = async (values) => {
//     console.log(import.meta.env.VITE_API_BASE_URL);
//     console.log(import.meta.env);
//     console.log("Success Email Input:", values.email);
//     console.log("Full API URL:", `${API_BASE_URL}/v1/api/mail/subscribe`);

//     const requestBody = JSON.stringify({ email: values.email.trim() });

//     console.log("Sending Request Body:", requestBody);

//     try {
//         const response = await fetch(`${API_BASE_URL}/v1/api/mail/subscribe`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ email: values.email }),
//             // body: JSON.stringify(data1)
//         });

//         const data = await response.json();

//         if (response.ok) {
//             console.log("Success: đỉnh ");
//             alert(`${data.message}`);
//         } else {
//             // console.error("Error: lỗi mẹ nó rồi");
//             alert(`${data.message}`);
//         }

//     } catch (error) {
//         console.error("Request error:", error);
//         alert("An error occurred. Please try again.");
//     }
// };


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
