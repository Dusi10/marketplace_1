import { useState, useEffect } from "react";
import { auth, db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc, query, where } from "firebase/firestore";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useAuthState } from "react-firebase-hooks/auth";

export function Listings() {
  const [itemList, setItemList] = useState<any>([]);

  const itemsCollectionRef = collection(db, "Item");

  const [user] = useAuthState(auth);

  const itemsQuery = user ? query(itemsCollectionRef, where("userId", "==", user.uid)) : null;

  const getItemList = async () => {
    try {
      const data = itemsQuery ? await getDocs(itemsQuery) : null;
      const filteredData = data ? data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })): null;
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

  return (
    <>
    <h1>Your Listings</h1>
      <div>
        <Row md={2} xs={1} lg={4} className={"g-3"}>
          {itemList.map(
            (item: {
              price: number;
              title: string;
              id: string;
              images: string;
              itemType: string
            }) => (
              <Col key={item.id}>
                <StoreItem {...item} />
                <button onClick={() => deleteItem(item.id)}>Delete Item</button>
              </Col>
            )
          )}
        </Row>
      </div>
    </>
  );
}
