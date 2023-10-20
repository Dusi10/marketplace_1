import React from "react"
import Sidebar from "../components/Chat/Sidebar";
import Chat from "../components/Chat/Chat";
import "../../src/components/Chat/ChatStyle.css"

const ChatPage = () => {
  return (
      <div className={"chatHome"}>
          <div className={"chatContainer"}>
              <Sidebar/>
              <Chat/>
          </div>

      </div>
  )
}

export default ChatPage