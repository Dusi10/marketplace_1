import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

export function Listings() {
  const [itemList, setItemList] = useState<any>([]);

  const itemsCollectionRef = collection(db, "Item");

  const getItemList = async () => {
    try {
      const data = await getDocs(itemsCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
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
