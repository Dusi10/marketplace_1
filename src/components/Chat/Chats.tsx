import React, {useContext} from "react"
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../config/firebase";

const Chats = () => {
    const [user] = useAuthState(auth);
    return (
        <div className={"chats"}>
            <div className={"userChat"}>
                <img className={"profileImg"} src={user?.photoURL || ""} alt={""}/>
                <div className={"userChatInfo"}>
                    <span className={"chatSpan"}>{user?.displayName}</span>
                    <p className={"chatP"}>Hello</p>
                </div>
            </div>
            <div className={"userChat"}>
                <img className={"profileImg"} src={user?.photoURL || ""} alt={""}/>
                <div className={"userChatInfo"}>
                    <span className={"chatSpan"}>{user?.displayName}</span>
                    <p className={"chatP"}>Hello</p>
                </div>
            </div>
            <div className={"userChat"}>
                <img className={"profileImg"} src={user?.photoURL || ""} alt={""}/>
                <div className={"userChatInfo"}>
                    <span className={"chatSpan"}>{user?.displayName}</span>
                    <p className={"chatP"}>Hello</p>
                </div>
            </div>
            <div className={"userChat"}>
                <img className={"profileImg"} src={user?.photoURL || ""} alt={""}/>
                <div className={"userChatInfo"}>
                    <span className={"chatSpan"}>{user?.displayName}</span>
                    <p className={"chatP"}>Hello</p>
                </div>
            </div>
        </div>
    )
}

export default Chats