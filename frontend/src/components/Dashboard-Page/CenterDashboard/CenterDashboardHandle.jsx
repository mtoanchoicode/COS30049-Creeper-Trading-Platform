import React from "react";
import "./CenterDashboard.css";
import NewsComponent from "../NewsComponent/NewsComponent"
import { Button, Form, Input } from "antd";
import Github from "../../../assets/Github.svg"; 
import Google from "../../../assets/Google.svg";


const onFinish = async (values) => {
    console.log("Success:", values);
};

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};

const Centers = ({title, subtitle}) => {
  return (
    <section className = "CenterComponent-Container" >
        <div className="Leftside-Container">
            <div className= "Leftside_heading-Container">
                <p>{title}</p>
            </div>

            <div className= "Leftside_Subheading-Container">
                <p>{subtitle}</p>
            </div>

           <div className="Center_LoginForm-Container">
                <Form 
                    layout = "horizontal"
                    name = "login"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="Center_LoginForm"
                >
                    <Form.Item
                    className="Center-SignUp-Input_Container"
                    name="email"
                    rules={[
                    {
                    required: true,
                    message: "Please input your email!",
                    },
                    ]}>
                        <Input
                            className="Center-SignUp_Input"
                            placeholder="Email/Phone number"
                        />
                    </Form.Item>

                    <Form.Item
                        className="Center-SignUp-Button_Container"
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            block
                            className="Center-SignUp_Button"
                            >
                            Sign Up
                        </Button>
                    </Form.Item>
            </Form>
           </div>
          

           {/* <div>

           </div> */}

           <div className= "OtherSignup-Follow_Container">
                <div className = "Item-Container">
                    <p className="OtherSignUp-title">Or Continue With</p>

                    <a 
                        className= "OtherSignUp-Link"
                        //Testing the link 
                        href = "https://www.google.com/">
                        <img src = {Google} alt = "Google icon"></img>
                    </a>
                </div>


                <div className = "Item-Container">
                    <p className="FollowUs-title">Follow Us</p>

                    <a 
                        className= "FollowUs-Link"
                        href = "https://github.com/mtoanchoicode/COS30049-Creeper-Trading-Platform">
                        <img src = {Github} alt = "Github icon"></img>
                    </a>
                </div>
           </div>
        </div>


        <div className= "Rightside-Container" >
            <NewsComponent/>
        </div>
    </section>
  )
};

export default Centers;
