import { useState, useEffect, JSXElementConstructor, ReactElement, ReactFragment, ReactPortal } from "react";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";

export function Books() {
  const [itemList, setItemList] = useState<any>([]);

  const itemsCollectionRef = collection(db, "Item");

  useEffect(() => {
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
    getItemList()
  }, []);
  return (
    <>
      <div>
      <Row md={2} xs={1} lg={4} className={"g-3"}>
            {itemList.map(
              (item: {
                price: number;
                title: string;
                id: number;
                images: string;                               
              }) => (
                <Col key={item.id}>
                  <StoreItem {...item} />
                  <p>{item.images}</p>
                </Col>
              )
              
            )}
          </Row>
    </div>
    </>
  );
}
