import React, { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import {collection, getDocs, query, setDoc, where} from "firebase/firestore"
import "../../components/Chat/ChatStyle.css"

const Search = () => {
    const [user] = useAuthState(auth)

    const [username, setUsername] = useState("")
    const [searchUser, setSearchUser] = useState(null)
    const [err, setErr] = useState(false)

    // const handleSearch = async () => {
    //     const q = query(collection(db, "users"), where("displayName", "==", username))

    //     try {
    //         const querySnapshot = await getDocs(q)
    //         querySnapshot.forEach((doc) =>{
    //             setSearchUser(doc.data())
    //         })
    //     } catch(err) {
    //         setErr(true)
    //     }
    // }


    // const handleKey = (e) => {
    //     e.code === "Enter" && handleSearch()
    // }

    // const handleSelect =async () => {
    //         const combinedId = user?.uid > searchUser?.uid ? user?.uid + searchUser?.uid : searchUser?.uid + user?.uid
    //         try {
    //             const res = await getDocs(db, "chats", combinedId)

    //             if (!res.exists()) {
    //                 await setDoc(doc, (db, "chats", combinedId),{messages: []})


    //             }

    //         } catch(err){}
    // }

    return (
        <div className={"searchChat"}>
            <div className={"searchForm"}>
                <input className={"chatInput"}
                 style={{
                    backgroundColor: "transparent",
                    border: "none", outline: "none",
                    color:"white", borderRadius: "10px",
                    padding: "10px"}} 
                    type={"text"} 
                    placeholder={"find a user"}
                    onChange={(e)=>setUsername(e.target.value)}
                    // onKeyDown={handleKey}
                    />
            </div>
            {err && <span>User not found</span>}
{user &&            <div className={"userChat"}>
                <img className={"profileImg"} src={user?.photoURL || ""} alt={""}/>
                <div className={"userChatInfo"}>
                    <span>{user?.displayName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search