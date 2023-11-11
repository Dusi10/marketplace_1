import React, { useContext, useEffect, useRef, useState } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../../context/ChatContext";
  

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const { data } = useContext(ChatContext);

  const ref = useRef(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formattedDate = message.date.toDate(); // Convert Firestore Timestamp to JavaScript Date
  const dateFormatter = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div className={`message ${message.senderId === user?.uid && "owner"}`}>
      <div className={"messageInfo"}>
        <img
          className={"messageImg"}
          src={
            message.senderId === user?.uid ? user?.photoURL : data.user.photoURL
          }
          alt={""}
        />
      </div>
      <div className={"messageContent"}>
        <p style={{margin:"0px"}} className={"messageP"}>{message.text}</p>
        <p style={{margin:"0px"}}>{dateFormatter.format(formattedDate)}</p>
        {message.img && (
          <img className={"messageImg"} src={message.img} alt={""} />
        )}
      </div>
    </div>
  );
};


export default Message;


