import React, { useEffect, useState } from "react";
import SideNavbar from "./SideNavbar";
import Users from "./Users";
import MainChatArea from "./MainChatArea";
import ProfilePage from "./ProfilePage";
import axios from "axios";

function ChatApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selfInfo, setSelfInfo] = useState({});
  const [selecteduser, setSelecteduser] = useState();
  const [socket,setSocket] = useState(null)
  // const [loading, setLoading] = useState(true);
  const base_url = "http://127.0.0.1:8000";

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${base_url}/users`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchSelfInfo = async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(`${base_url}/self`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      setSelfInfo(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchSelfInfo();
  }, []);

  const sendConnectionRequest = (username) => {
    const token = localStorage.getItem("authToken");
    const wsUrl = `ws://127.0.0.1:8000/ws/chat/${username}/?token=${token}`;

    const newSocket = new WebSocket(wsUrl);

    newSocket.onopen = () => {
      // console.log("Connected");
      setSocket(newSocket)

    };
    newSocket.onmessage = (message) => {
      const data = JSON.parse(message.data)
      
    };
    newSocket.onerror = (e) => {
      console.log("Connection error:",e);
    };
    newSocket.onclose = () => {
      console.log("Closed");
    };

  };
  const handleUserClick = (user) => {
    // console.log("Clicked username:", user);
    if (selecteduser && (selecteduser.username === user.username))
      return
    setSelecteduser(user);
    sendConnectionRequest(user.username);
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center p-6">
      <div className="h-full w-full rounded-xl overflow-hidden flex">
        <SideNavbar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          isProfileOpen={isProfileOpen}
          setIsProfileOpen={setIsProfileOpen}
        />

        {!isProfileOpen && (
          <Users
            isMenuOpen={isMenuOpen}
            userData={users}
            onUserClick={handleUserClick}
          />
        )}
        {isProfileOpen && <ProfilePage selfInfo={selfInfo} />}

        <MainChatArea user={selecteduser} socket={socket} selfInfo = {selfInfo} isMenuOpen = {isMenuOpen}/>
      </div>
    </div>
  );
}

export default ChatApp;
