import React from "react"
import ChatNavbar from "./ChatNavbar";
import Chats from "./Chats";
import Search from "./Search";

const Sidebar = () => {
    return (
        <div className={"sidebar"}>
            <ChatNavbar/>
            <Search />
            <div className="search-container"></div>
            <Chats/>
        </div>
    )
}

export default Sidebar