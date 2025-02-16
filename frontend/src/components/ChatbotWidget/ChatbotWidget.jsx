import React, { useState, useEffect, useRef } from "react";
import { Button } from "antd";
import { MessageOutlined, CloseOutlined } from "@ant-design/icons";
import "./ChatbotWidget.css";

const ChatbotWidget = () => {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatContainerRef = useRef(null);
  const [position, setPosition] = useState(() => ({
    x: window.innerWidth - 80, // Adjust based on button size
    y: window.innerHeight - 80, // Adjust based on button size
  }));

  // Update position when window resizes
  useEffect(() => {
    const handleResize = () => {
      setPosition({
        x: window.innerWidth - 80,
        y: window.innerHeight - 80,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const clickThreshold = 5;

  useEffect(() => {
    if (isOpen) {
      chatContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, isOpen]);

  // Drag Start
  const handleDragStart = (e) => {
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  // Drag Move
  const handleDragMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
    // Only update position if the movement is significant
    if (deltaX > clickThreshold || deltaY > clickThreshold) {
      setPosition({
        x: e.clientX - clickThreshold,
        y: e.clientY - clickThreshold,
      });
    }
  };

  // Drag End
  const handleDragEnd = (e) => {
    setIsDragging(false);

    // Check if it was a click (not a drag)
    const deltaX = Math.abs(e.clientX - dragStart.current.x);
    const deltaY = Math.abs(e.clientY - dragStart.current.y);
    if (deltaX < clickThreshold && deltaY < clickThreshold) {
      setIsOpen(true); // Only open if it was a click
    }
  };

  // Attach & detach event listeners for dragging
  useEffect(() => {
    document.addEventListener("mousemove", handleDragMove);
    document.addEventListener("mouseup", handleDragEnd);
    return () => {
      document.removeEventListener("mousemove", handleDragMove);
      document.removeEventListener("mouseup", handleDragEnd);
    };
  }, [isDragging]);

  const sendMessage = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { sender: "user", text }];
    setMessages(newMessages);
    setInput("");

    try {
      const response = await fetch(`${API_BASE_URL}/v1/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      const data = await response.json();
      console.log(data);
      setMessages([...newMessages, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        { sender: "bot", text: "Error fetching response." },
      ]);
      console.log(error);
    }
  };

  const fetchEthPrice = async () => {
    try {
      const response = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
      );
      const data = await response.json();
      const ethPrice = `$${data.ethereum.usd}`;
      setMessages([
        ...messages,
        { sender: "bot", text: `Current ETH price: ${ethPrice}` },
      ]);
    } catch (error) {
      setMessages([
        ...messages,
        { sender: "bot", text: "Failed to fetch ETH price." },
      ]);
    }
  };

  return (
    <div>
      {isOpen ? (
        <div
          className="chatbot-widget"
          style={{
            right: `${window.innerWidth - position.x - 50}px`,
            bottom: `${window.innerHeight - position.y}px`,
          }}
        >
          <div className="chatbot-header" onMouseDown={handleDragStart}>
            <span className="chatbot-title">Creeper Assistant</span>
            <CloseOutlined
              className="chatbot-close-icon"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="chatbot-messages" ref={chatContainerRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`chatbot-message ${msg.sender}`}>
                <span>{msg.text}</span>
              </div>
            ))}
          </div>
          <div className="chatbot-footer">
            <Button onClick={fetchEthPrice} type="primary" block>
              Check ETH Price
            </Button>
            <div className="chatbot-input-group">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                onPressEnter={() => sendMessage(input)}
              />
              <Button type="primary" onClick={() => sendMessage(input)}>
                Send
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          type="primary"
          shape="circle"
          size="large"
          className="chatbot-open-button"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
          onMouseDown={handleDragStart}
          onClick={() => setIsOpen(true)}
          icon={<MessageOutlined />}
        />
      )}
    </div>
  );
};

export default ChatbotWidget;
