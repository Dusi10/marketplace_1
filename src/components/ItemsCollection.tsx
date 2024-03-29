import { useState, useEffect } from "react";
import { storage } from "../config/firebase";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import "../formating/format.css";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Col, Container, Row } from "react-bootstrap";
import { StoreItem } from "./StoreItem";

interface Item {
  id: string;
  img: string;
  itemType: string;
}

export function SelectListings() {
  const [itemList, setItemList] = useState<any>([]);
  //Loading phase
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const itemsCollectionRef = collection(db, "Item");

  //Képek adatbázisból lehúzása
  const [imageList, setImageList] = useState<string[]>([]);
  const imageListRef = ref(storage, "images/");

  // Filter state
  const [filterOption, setFilterOption] = useState("All");

  const filterText = "Típus szerinti keresés:";

  useEffect(() => {
    setIsLoading(true);
    listAll(imageListRef)
      .then((response) =>
        Promise.all(response.items.map((item) => getDownloadURL(item)))
      )
      .then((urls) => {
        setImageList(urls);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const getItemList = async () => {
    // Read the data
    try {
      const data = await getDocs(itemsCollectionRef);
      const filteredItems = data.docs
        .map((doc, index) => ({
          ...doc.data(),
          id: doc.id,
          img: imageList[index],
          itemType: doc.data().itemType,
        }))
        .filter(
          (item) => filterOption === "All" || item.itemType === filterOption
        );
      setItemList(filteredItems);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getItemList();
  }, [filterOption]);

  return (
    <div className="listingBackground">
      <Container className="mb-4">
        <div>
          <div style={{ display: "flex" }}>
            <p style={{ paddingInline: "10px" }}>{filterText}</p>
            <select
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              className="mb-4"
            >
              <option value="All">Minden</option>
              <option value="Clothes">Ruhák</option>
              <option value="Food">Ételek</option>
              <option value="Item">Tárgyak</option>
              <option value="Book">Könyvek</option>
            </select>
          </div>
        </div>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Row md={2} xs={1} lg={4} className={"g-3"}>
            {itemList.map((item: any) => (
              <Col key={item.id}>
                <StoreItem sellerId={item.userId} {...item} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}
