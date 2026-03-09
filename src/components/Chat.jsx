import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

const Chat = ({ selectedConversation, messages, setMessages }) => {
  const [userMessage, setUserMessage] = useState("");

  const sendData = async () => {
    if (!userMessage.trim() || !selectedConversation) return;

    const response = await fetch(
      `http://localhost:5000/chat/${selectedConversation}`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      },
    );

    const data = await response.json();
    console.log(messages);
    if (data.success) {
      setMessages((prev) => [
        ...prev,
        { role: "user", message: userMessage },
        { role: "bot", message: data.reply },
      ]);
    }

    setUserMessage("");
  };

  if (!selectedConversation) {
    return (
      <div className="text-white w-2/3 flex items-center justify-center">
        <h1 className="text-2xl">Select a conversation to start chatting</h1>
      </div>
    );
  }

  return (
    <div className="text-white w-2/3 flex flex-col">
      <h1 className="text-3xl p-2">Chat</h1>

      <div className="bg-transparent min-h-110 flex-col">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={
              msg.role === "user"
                ? "bg-amber-500 rounded-2xl mt-5 p-3 ml-auto mr-5 w-fit"
                : "bg-amber-900 rounded-2xl mt-5 p-3 mx-5 w-fit"
            }
          >
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </div>
        ))}
      </div>

      <div className="mx-10 flex h-10 mt-7">
        <input
          className="bg-gray-900 p-3 w-4/5 rounded-2xl"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          type="text"
        />
        <button
          className="bg-blue-600 active:bg-blue-700 mx-10 w-1/5 h-full rounded-2xl"
          onClick={sendData}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Chat;
