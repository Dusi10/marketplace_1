import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, storage } from "../../config/firebase";
import { ChatContext } from "../../context/ChatContext";
import { Timestamp, arrayUnion, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { getDownloadURL, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const [user] = useAuthState(auth);
  const { data } = useContext(ChatContext);


  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          // TODO: Handle Error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: user?.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          senderId: user?.uid,
          text,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", user?.uid || ""), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user?.uid || ""), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImg(null);
  };

  return (
    <div className={"input"}>
      <input
        className={"customChatInput"}
        type={"text"}
        placeholder={"Type something..."}
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className={"send"}>
        {/* <img
            className={"sendImg"}
            src={"../../public/pictures/imgs/attach.png"}
            alt={""}
          />
          <input
            type={"file"}
            style={{ display: "none" }}
            id={"file"}
            onChange={(e) => setImg(e.target.files[0])}
          />
          <label htmlFor={"life"}>
            <img
              className={"sendImg"}
              src={"../../public/pictures/imgs/img.png"}
              alt={""}
            />
          </label> */}
        <button className={"sendButton"} style={{ borderRadius: "10px" }} onClick={handleSend}>
          Küldés
        </button>
      </div>
    </div>
  );
};

export default Input;
