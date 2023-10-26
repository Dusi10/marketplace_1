import {useState, useEffect} from "react";
import {storage} from "../config/firebase";
import {ref, listAll, getDownloadURL} from "firebase/storage";
import "../formating/format.css";
import "../formating/pictures.css";
import {db} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";
import {Col, Row} from "react-bootstrap";
import {StoreItem} from "./StoreItem";

interface Props {
    typeOfItem: string,
    maxItemToShow: number,
}

export function AllListings({typeOfItem, maxItemToShow}: Props) {
    const [itemList, setItemList] = useState<any>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const itemsCollectionRef = collection(db, "Item");

    const [imageList, setImageList] = useState<string[]>([]);

    const [refreshKey, setRefreshKey] = useState(0);


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

    const handleUnlikeItem = () => {
        setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey
    };

    //Elválasztás

    const getItemList = async () => {
        try {
            const data = await getDocs(itemsCollectionRef);
            const filteredItems = data.docs
                .map((doc, index) => ({
                    ...doc.data(),
                    id: doc.id,
                    img: imageList[index],
                    itemType: doc.data().itemType,
                }))
                .filter((item) => item.itemType === typeOfItem || typeOfItem === "All");

            const limitedItemList = filteredItems.slice(0, maxItemToShow)
            setItemList(limitedItemList);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getItemList();
    }, [typeOfItem]);


    return (
        <div>
            <div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (itemList.length < 1
                        ? `Jelenleg nincsen ${typeOfItem} hirdetés`
                        : <Row md={2} xs={1} lg={4} className={"g-3"}>
                            {itemList.map(
                                (item: {
                                    price: number;
                                    title: string;
                                    id: number;
                                    images: string;
                                    description: string;
                                    itemType: string
                                }) => (
                                    <Col key={item.id}>
                                        <StoreItem onLikeUpdate={handleUnlikeItem} {...item} />
                                    </Col>
                                )
                            )}
                        </Row>
                )}
            </div>
        </div>
    );
}