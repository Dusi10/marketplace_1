import React from "react"
import Sidebar from "../components/Chat/Sidebar";
import Chat from "../components/Chat/Chat";
import "../../src/components/Chat/ChatStyle.css"
import AddUser from "./HomePage/AddUser";

const ChatPage = () => {
  return (
      <div className={"chatHome"}>
          <div className={"chatContainer"}>
              <Sidebar/>
              <Chat/>
              
          </div>
          <AddUser/>
      </div>
  )
}

export default ChatPage