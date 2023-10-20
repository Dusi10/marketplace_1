import React from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../config/firebase";

const ChatNavbar = () => {
    const [user] = useAuthState(auth)
    return (
        <div className={"chatNavbar"}>
            <span className={"log"}>{user?.displayName}</span>
            <div className={"user"}>
                <img className={"profileImg"} src={user?.photoURL || ""} alt={""}/>
            </div>
        </div>
    )
}

export default ChatNavbar