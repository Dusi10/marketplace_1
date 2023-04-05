import { useState, useEffect } from "react";
import { storage } from "../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "../formating/format.css";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Col, Row } from "react-bootstrap";
import { StoreItem } from "./StoreItem";

export function ItemsCollection() {
  const [itemList, setItemList] = useState<any>([]);
  //Loading phase
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const itemsCollectionRef = collection(db, "Item");

  //Képek adatbázisből lehúzása
  const [imageList, setImageList] = useState<string[]>([]);

  
  const imageListRef = ref(storage, "images/");
  useEffect(() => {
    setIsLoading(true);
    listAll(imageListRef).then((response) => {
      Promise.all(response.items.map((item) => getDownloadURL(item))).then(
        (urls) => {
          setImageList(urls);
          setIsLoading(false);
        }
      );
    });
  }, []);

  //Elválasztás

  const getItemList = async () => {
    //Read the data
    //See the item list
    try {
      const data = await getDocs(itemsCollectionRef);
      const filteredItems = data.docs.map((doc, index) => ({
        ...doc.data(),
        id: doc.id,
        img: imageList[index],
      }));
      setItemList(filteredItems);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getItemList();
  }, []);

  
  return (
    <div>
      <div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Row md={2} xs={1} lg={4} className={"g-3"}>
            {itemList.map(
              (item: {
                price: number;
                title: string;
                id: number;
                images: string;
                description:string                               
              }) => (
                <Col key={item.id}>
                  <StoreItem {...item} />
                </Col>
              )
              
            )}
          </Row>
        )}
      </div>
    </div>
  );
}
