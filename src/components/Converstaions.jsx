import React, { useState } from "react";
import { useEffect } from "react";
import Chat from "./Chat";

const Conversations = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [title, setTitle] = useState("new conversation");
  const getConversations = async () => {
    const res = await fetch(`http://localhost:5000/chat/conversations`, {
      method: "GET",
      credentials: "include",
    });
    const data = await res.json();
    console.log("API DATA:", data);
    console.log("Conversations:", data.conversations);
    if (!data.success) {
      setIsLoggedIn(false);
      return;
    }
    console.log("code after if statement");
    setIsLoggedIn(true);
    setConversations(data.conversations);
  };

  const newChat = async () => {
    const data = await fetch(`http://localhost:5000/chat/newChat`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: title }),
    });

    const response = await data.json();
    console.log(response);
  };

  const openConversation = async (conversationId) => {
    try {
      setSelectedConversation(conversationId);

      const res = await fetch(`http://localhost:5000/chat/${conversationId}`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      console.log("Messages:", data);

      if (data.success) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" bg-gradient-to-br from-slate-950 via-slate-850 to-indigo-800 min-h-140 text-white flex">
      <div className="w-1/3 ">
        <button
          className="bg-green-400 p-3 rounded-2xl "
          onClick={getConversations}
        >
          see convos
        </button>
        {isLoggedIn == false ? (
          <h1 className="text-red-600 text-2xl">You have to login first</h1>
        ) : (
          <h1></h1>
        )}
        <div className="h-10/12  border border-white/10 bg-white/10 flex flex-col justify-between ">
          <div className="flex flex-col gap-3 ">
            {conversations.map((conversation, index) => (
              <p
                className="p-3 rounded-2xl border-2 border-blue-200 text-white"
                key={index}
                onClick={() => openConversation(conversation._id)}
              >
                {conversation.title}
              </p>
            ))}
          </div>
          <div className="flex">
            <input
              className="bg-gray-900 p-3 w-4/5 rounded-2xl"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
            />
            <button
              className="bg-blue-400 mx-10 active:bg-blue-700 w-1/5 h-full rounded-2xl"
              onClick={newChat}
            >
              new chat
            </button>
          </div>
        </div>
      </div>
      <Chat
        selectedConversation={selectedConversation}
        messages={messages}
        setMessages={setMessages}
      />
    </div>
  );
};

export default Conversations;
