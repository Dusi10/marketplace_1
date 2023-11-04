import React, { useContext, useEffect, useRef, useState } from "react";
import { auth } from "../../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { ChatContext } from "../../context/ChatContext";
  

const Message = ({ message }) => {
  const [user] = useAuthState(auth);
  const { data } = useContext(ChatContext);

  const ref = useRef(null)

//   const formatDate = (messageDate) => {
//     // Split the date string into its components
//     const dateParts = messageDate.split(' at ');
    
//     if (dateParts.length === 2) {
//       const timeString = dateParts[1];
//       const date = new Date('January 1, 1970 ' + timeString); // Using a placeholder date since we only need time
  
//       if (!isNaN(date.getTime())) {
//         const options = {
//           hour: 'numeric',
//           minute: 'numeric',
//           hour12: false, // To display in 24-hour format
//         };
  
//         return new Intl.DateTimeFormat('en-US', options).format(date);
//       }
//     }
  
//     return "Invalid Date";
//   };
  useEffect(() => {
    ref.current?.scrollIntoView({behavior: "smooth"})
  }, [message])

  return (
    <div //ref={ref}
    className={`message ${message.senderId === user?.uid && "owner"}`}>
      <div className={"messageInfo"}>
        <img
          className={"messageImg"}
          src={
            message.senderId === user?.uid ? user?.photoURL : data.user.photoURL
          }
          alt={""}
        />
        {/* <span>{format(message.date)}</span> */}
      </div>
      <div  className={"messageContent"}>
        <p  className={"messageP"}>{message.text}</p>
        {message.img && <img className={"messageImg"} src={message.img} alt={""}/>}
      </div>
    </div>
  );
};

export default Message;


