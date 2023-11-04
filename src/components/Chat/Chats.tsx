import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { ChatContext } from "../../context/ChatContext";

const Chats = () => {

  const [user] = useAuthState(auth);
  const {dispatch} = useContext(ChatContext);

  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "userChats", user?.uid || ""), (doc) => {
      setChats(doc.data());
    });

    return () =>{
        unsub()
    }
  }, [user?.uid]);

  const handleSelect = (u) => {
    dispatch({type: "CHANGE_USER", payload: u})
  }

  console.log(Object.entries(chats))
  return (
    <div className={"chats"}>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (

      <div className={"userChat"} key={chat[0]} onClick={() => handleSelect(chat[1].userInfo)}>
        <img className={"profileImg"} src={chat[1].userInfo.photoURL || ""} alt={""} />
        <div className={"userChatInfo"}>
          <span className={"chatSpan"}>{chat[1].userInfo.displayName}</span>
          <p className={"chatP"}>{chat[1].lastMessage?.text}</p>
        </div>
      </div>
        ))}
    </div>
  );
};

export default Chats;
