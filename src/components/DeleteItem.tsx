import { deleteDoc, doc } from "firebase/firestore"
import { db } from "../config/firebase"

const deleteItem = async (id: any) => {
    const itemDoc = doc(db, "Item", id )
    await deleteDoc(deleteItem)
  }


export const DeleteItem = ({id}:string | number) =>{
    return(
        <div>
            <button onClick={()=> deleteItem({id})}>Delete Item</button>
        </div>)
}