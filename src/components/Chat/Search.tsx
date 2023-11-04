import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import "../../components/Chat/ChatStyle.css";
import { set } from "react-hook-form";

interface SearchUser {
  email: string;
  picture: string;
  uid: string;
  username: string;
}

const Search = () => {
  const [user] = useAuthState(auth);

  const [username, setUsername] = useState(""); //Username for the input
  const [searchUser, setSearchUser] = useState<SearchUser>(); // actual user that we are searching for
  const [err, setErr] = useState(false);

  const handleSearch = async () => {
    const q = query(
      collection(db, "UsersData"),
      where("username", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        // Handle the case when no user is found with the provided username.
        setErr(true);
        setTimeout(setErr, 3000, false) // set error to false after 3 seconds so the text will disappear
      } else {
        querySnapshot.forEach((doc) => {
          setSearchUser(doc.data() as SearchUser);
          
        });
        setErr(false);
      }
    } catch (error) {
      // Handle any other potential errors here.
      console.error("Error while searching for users:", error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
    user?.uid > searchUser?.uid
    ? user?.uid + searchUser?.uid
    : searchUser?.uid + user?.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", user?.uid || ""), {
            [combinedId + ".userInfo"]: {
              uid: searchUser?.uid,
              displayName: searchUser?.username,
              photoURL: searchUser?.picture,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          
          await updateDoc(doc(db, "userChats", searchUser?.uid || ""), {
            [combinedId + ".userInfo"]: {
              uid: user?.uid,
              displayName: user?.displayName,
              photoURL: user?.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });          
      }
    } catch (err) {
        console.error("Error while creating chat:", err);
    }
    setSearchUser(undefined);
    setUsername("");
  };

  return (
    <div className={"searchChat"}>
      <div className={"searchForm"}>
        <div className="input-container">
          <input
            className={"chatInput"}
            style={{
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              borderRadius: "10px",
              padding: "10px",
              
            }}
            type={"text"}
            value={username}
            placeholder={"Keress felhasználót"}
            onKeyDown={handleKey}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleSearch}>Keresés</button>
        </div>
      </div>

      {err && (
        <span
          style={{
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            color: "white",
            opacity: "0.7",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          Nem létező felhasználó
        </span>
      )}
      {searchUser && (
            <div className={"userChat"} onClick={handleSelect}>
            <img className={"profileImg"} src={searchUser?.picture || ""} alt={""}/>
            <div className={"userChatInfo"}>
                <span className={"chatSpan"}>{searchUser?.username}</span>
                <p className={"chatP"}></p>
            </div>
        </div>
      )}
    </div>
  );
};

export default Search;
