import React, {useContext} from "react";
import "./CenterDashboard.css";
import NewsComponent from "../NewsComponent/NewsComponent"
import MarketCoinBrief from "../../Market/MarketCoinBrief/MarketCoinBrief";
import { CoinContext } from "../../../contexts/CoinContext";
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
    const {coins} = useContext(CoinContext);

    const HotCoins = coins.slice(0,5);



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
            <div className= "List-HotCoin-Container"> 
                <h2>Hot Coins</h2>
                {HotCoins.map(coin =>(
                <MarketCoinBrief className="Hot-Coins-listing"
                  id={coin.id}
                  name={coin.name}
                  symbol={coin.symbol.toUpperCase()}
                  current_price={coin.current_price}
                  image={coin.image}
                  change={coin.price_change_percentage_24h}
                />
              ))}
            </div>

            <NewsComponent/>
        </div>
    </section>
  )
};

export default Centers;
