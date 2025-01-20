import React, { useEffect, useRef, useState } from "react";
import defaultImage from "../assets/default_image.jpg";
import { IoSend } from "react-icons/io5";
import axios from "axios";

function MainChatArea({ user, socket, selfInfo, isMenuOpen }) {
  const [messages, setMessages] = useState([]); // State to store messages
  const form = useRef(null);
  const messagesEndRef = useRef(null);
  const base_url = "http://127.0.0.1:8000";

  // Scroll to the bottom whenever new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (socket) {
      socket.onmessage = (message) => {
        const data = JSON.parse(message.data);

        // Check if the message is for the current chat room
        if (
          (data.username === selfInfo.username && data.to === user.username) ||
          (data.username === user.username && data.to === selfInfo.username)
        ) {
          setMessages((prevMessages) => [
            ...prevMessages,
            { username: data.username, message: data.message },
          ]);
          scrollToBottom();
        }
      };
    }

    // Clear messages when the user changes
    return () => setMessages([]);
  }, [socket, user, selfInfo]);

  const fetchMessages = async () => {
    const my_id = selfInfo.username;
    const other_id = user.username;

    const token = localStorage.getItem("authToken");

    if (!token) {
      console.error("No authentication token found.");
      return;
    }

    try {
      const response = await axios.get(`${base_url}/fetchmessages`, {
        headers: {
          Authorization: `Token ${token}`,
        },
        params: {
          my_id,
          other_id,
        },
      });

      console.log("Messages fetched successfully:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const message = formData.get("message");
    if (message && socket) {
      socket.send(
        JSON.stringify({
          message: message,
          username: selfInfo.username,
          to: user.username, // Include the recipient's username
        })
      );
    }

    form.current.reset();
  };
  useEffect(() => {
    if (user) {
      fetchMessages();
    }
  }, [user]);
  return (
    <>
      {user ? (
        <div className="h-full bg-[#222E35] flex-auto flex flex-col">
          {/* Chat header */}
          <div className="upperbar w-full h-16 bg-[#12364a] flex items-center px-3 md:px-5  lg:px-10 gap-x-5">
            <div className="h-8 aspect-square rounded-full overflow-hidden">
              <img src={defaultImage} alt="User Avatar" />
            </div>
            <h2 className="text-white">
              {user.first_name} {user.last_name}
            </h2>
          </div>

          {/* Messages display area */}
          <div
            className="showmessages flex-auto px-5 py-3 overflow-y-auto"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#888 #111",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.username === selfInfo.username
                    ? "justify-end"
                    : "justify-start"
                } mb-3`}
              >
                <div
                  className={`max-w-[60%] px-3 py-1 md:py-3 rounded-lg ${
                    msg.username === selfInfo.username
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input field to type and send messages */}
          <div className="typemessage w-full h-20 bg-[#12364a] px-2 md:px-5 lg:px-10">
            <form
              ref={form}
              onSubmit={sendMessage}
              className="w-full h-full flex justify-between py-4 gap-x-4 md:gap-x-10"
            >
              <input
                type="text"
                required
                name="message"
                placeholder="Enter Your Message..."
                className="w-full bg-[#222E35] outline-none px-3 md:px-5 text-sm md:text-lg text-white rounded-xl"
              />
              <button
                className="text-[#8d8c8c] text-xl md:text-3xl"
                type="submit"
              >
                <IoSend />
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="h-full bg-[#222E35] flex-auto flex justify-center items-center">
          <div className="text-white">Select a user to start chatting</div>
        </div>
      )}
    </>
  );
}

export default MainChatArea;
