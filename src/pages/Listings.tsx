import {useState, useEffect} from "react";
import {auth, db} from "../config/firebase";
import {collection, getDocs, deleteDoc, doc, query, where, updateDoc} from "firebase/firestore";
import {Col, Row} from "react-bootstrap";
import {StoreItem} from "../components/StoreItem";
import {useAuthState} from "react-firebase-hooks/auth";
import "../formating/format.css"
import {number, string} from "yup";

export function Listings() {
    const [itemList, setItemList] = useState<any>([]);

    const [isEditing, setIsEditing] = useState(false)
    const [editedTitle, setEditedTitle] = useState("");
    const [editedPrice, setEditedPrice] = useState("");
    const [editItemId, setEditItemId] = useState("");

    const itemsCollectionRef = collection(db, "Item");

    const [user] = useAuthState(auth);

    const itemsQuery = user ? query(itemsCollectionRef, where("userId", "==", user.uid)) : null;

    const getItemList = async () => {
        try {
            const data = itemsQuery ? await getDocs(itemsQuery) : null;
            const filteredData = data ? data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            })) : null;
            setItemList(filteredData);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getItemList();
    }, []);

    const deleteItem = async (id: string) => {
        const itemDoc = doc(db, "Item", id);
        await deleteDoc(itemDoc);
        getItemList();
    };
    const handleEditClick = (item: any) => {
        // When the "Edit Item" button is clicked, set the edited title, price, and item ID.
        setEditedTitle(item.title)
        setEditedPrice(item.price.toString())
        setEditItemId(item.id)
        setIsEditing(true);
    };

    const saveItem = async () => {
        // Convert editedPrice to a number before saving it to Firebase
        const updatedItemData = {
            title: editedTitle,
            price: parseFloat(editedPrice),
        };

        const itemDoc = doc(db, "Item", editItemId);
        await updateDoc(itemDoc, updatedItemData);

        // Reset the editing state
        setIsEditing(false);
        setEditedTitle("");
        setEditedPrice("");
        setEditItemId("");

        getItemList(); // Refresh the item list after saving
    };

    return (
        <div className="listingBackground">
            <h1>Hirdetéseim</h1>
            <div>
                <Row md={2} xs={1} lg={4} className={"g-3"}>
                    {itemList.map(
                        (item: {
                            price: number;
                            title: string;
                            id: string;
                            images: string;
                            itemType: string;
                        }) => (
                            <Col key={item.id}>
                                <StoreItem onLikeUpdate={() => { } } {...item} />

                                {isEditing && editItemId === item.id ? (
                                    <div style={{display: 'grid', marginTop: "10px"}}>
                                        <input
                                            type="text"
                                            placeholder="Cím"
                                            value={editedTitle}
                                            style={{borderRadius: "10px", paddingLeft: "7px"}}
                                            onChange={(e) => setEditedTitle(e.target.value)}
                                        />
                                        <input
                                            type="number"
                                            placeholder="Ár"
                                            value={editedPrice}
                                            style={{borderRadius: "10px", paddingLeft: "7px"}}
                                            onChange={(e) => setEditedPrice(e.target.value)}
                                        />
                                        <button className={"custom-button fill-button"} onClick={saveItem}>Mentés
                                        </button>
                                    </div>
                                ) : (
                                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: "10px"}}>
                                        <button className={"custom-button fill-button"}
                                                onClick={() => handleEditClick(item)}>
                                            Szerkesztés
                                        </button>
                                        <button className={"custom-button fill-button"} onClick={() => deleteItem(item.id)}>Tárgy törlése
                                        </button>
                                    </div>)}
                            </Col>
                        )
                    )}
                </Row>
            </div>
        </div>
    );
}
