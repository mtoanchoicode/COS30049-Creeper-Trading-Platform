import React from "react";

import VietPhat from "../../../assets/VietPhat.jpg"
import ToanTruong from "../../../assets/ToanTruong.jpg"
import HoangTrung from "../../../assets/HoangTrung.jpg"
import GiaKhang from "../../../assets/GiaKhang.png"


const FounderDetails = [
    {
        Name: "Viet Phat",
        Position: "CEO",
        Image: VietPhat,
        renderContent: () => (
            <div>
               <p>The CEO leads Creeper’s vision to revolutionize decentralized trading. Focused on simplicity, 
                transparency, and security, the CEO drives innovation, builds partnerships, and ensures the platform 
                meets the needs of all traders globally.</p>
            </div>
        ),
    },
    {
        Name: "Minh Toan",
        Position: "CTO",
        Image: ToanTruong,
        renderContent: () => (
            <div>
               <p>The CTO drives Creeper’s technological innovation, 
                ensuring the platform is secure, scalable, 
                and user-friendly. By leveraging blockchain and smart contracts, the CTO delivers a seamless, automated trading experience, keeping Creeper at the forefront of DeFi technology.</p>
            </div>
        ),
    },
    {
        Name: "Hoang Trung",
        Position: "COO",
        Image: HoangTrung,
        renderContent: () => (
            <div>
               <p>The COO optimizes Creeper’s operations for efficiency and scalability. 
                By streamlining processes and fostering a user-centric culture, 
                the COO ensures a seamless trading experience for both beginners and advanced users</p>
            </div>
        ),
    }, 
    {
        Name: "Gia Khang",
        Position: "CFO",
        Image: GiaKhang,
        renderContent: () => (
            <div>
               <p>The CFO manages Creeper’s 
                financial strategy, ensuring transparency and sustainability. 
                By overseeing budgeting, risk management, and investments, 
                the CFO navigates the volatile crypto market, supporting the platform’s growth 
                and long-term success.</p>
            </div>
        ),
    },
];

export default FounderDetails;
