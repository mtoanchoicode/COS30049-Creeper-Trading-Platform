import React, { useContext } from "react";
import "./CenterDashboard.css";
import { Link } from "react-router-dom";
import NewsComponent from "../NewsComponent/NewsComponentHandle";
import MarketCoinBrief from "../../Market/MarketCoinBrief/MarketCoinBrief";
import { CoinContext } from "../../../contexts/CoinContext";
import { NewsContext } from "../../../contexts/NewsContext";
import { Button, Form, Input } from "antd";
import Github from "../../../assets/Github.svg";
import Google from "../../../assets/Google.svg";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const onFinish = async (values) => {
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
    console.error("Request error:", error);
    alert("An error occurred. Please try again.");
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Centers = ({ title, subtitle }) => {
  const { coins } = useContext(CoinContext);

  const { newsData } = useContext(NewsContext);

  const HotCoins = coins.slice(0, 5);

  return (
    <section className="CenterComponent-Container">
      <div className="Leftside-Container">
        <div className="Leftside_heading-Container">
          <p>{title}</p>
        </div>

        <div className="Leftside_Subheading-Container">
          <p>{subtitle}</p>
        </div>

        <div className="Center_SubscribeForm-Container">
          <Form
            layout="horizontal"
            name="Subscribe"
            initialValues={{ email: "" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            className="Center_SubscribeForm"
          >
            <Form.Item
              className="Center-Subscribe-Input_Container"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                className="Center-Subscribe_Input"
                placeholder="Email/Phone number"
              />
            </Form.Item>

            <Form.Item className="Center-Subscribe-Button_Container">
              <Button
                type="primary"
                htmlType="submit"
                block
                className="Center-Subscribe_Button"
              >
                Subscribe
              </Button>
            </Form.Item>
          </Form>
        </div>

        <div className="OtherSignup-Follow_Container">
          <div className="Item-Container">
            <p className="OtherSignUp-title">Or Continue With</p>

            <a className="OtherSignUp-Link" href="https://www.google.com/">
              <img src={Google} alt="Google icon"></img>
            </a>
          </div>

          <div className="Item-Container">
            <p className="FollowUs-title">Follow Us</p>

            <a
              className="FollowUs-Link"
              href="https://github.com/mtoanchoicode/COS30049-Creeper-Trading-Platform"
            >
              <img src={Github} alt="Github icon"></img>
            </a>
          </div>
        </div>
      </div>

      <div className="Rightside-Container">
        <div className="List-HotCoin-Container">
          <h2>Hot Coins</h2>
          {HotCoins.map((coin) => (
            <MarketCoinBrief
              key={coin.id}
              className="Hot-Coins-listing"
              id={coin.id}
              name={coin.name}
              symbol={coin.symbol.toUpperCase()}
              current_price={coin.current_price}
              image={coin.image}
              change={coin.price_change_percentage_24h}
            />
          ))}
        </div>

        <div className="News-container">
          <div className="News-heading-container">
            <h2 className="News-heading-title">News</h2>

            <Link to="/news">
              <p className="News-Link">View all news</p>
            </Link>
          </div>

          <div className="News-Content-Container">
            {newsData?.sort((a, b) => b.id - a.id).slice(0, 4).map(news => (
              <NewsComponent key={news.id} id={news.id} Title={news.Title} />
            ))}
<<<<<<< HEAD
          </div> 
=======
          </div>
>>>>>>> 83f6a25ebb3ff38d072dd7c1e563c92661061c85
        </div>
      </div>
    </section>
  )
};

export default Centers;
