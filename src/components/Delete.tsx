import { db } from "../config/firebase";
import {deleteDoc, doc } from "firebase/firestore";



export const Delete = () =>{
    const deleteItem = async (id: string) => {
        const itemDoc = doc(db, "Item", id);
        await deleteDoc(itemDoc);
      };
    return(
        <div></div>)
}