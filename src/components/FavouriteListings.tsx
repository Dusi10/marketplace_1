import {useState, useEffect} from "react";
import {auth, storage} from "../config/firebase";
import {ref, listAll, getDownloadURL} from "firebase/storage";
import "../formating/format.css";
import "../formating/pictures.css";
import {db} from "../config/firebase";
import {collection, getDocs} from "firebase/firestore";
import {Col, Container, Row} from "react-bootstrap";
import {StoreItem} from "./StoreItem";
import { useAuthState } from "react-firebase-hooks/auth";


interface Props {
    typeOfItem: string,
    maxItemToShow: number,
}

export function FavouriteListings({title}:any) {
    const [user] = useAuthState(auth);
    
    const [itemList, setItemList] = useState<any>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const itemsCollectionRef = collection(db, "Likes");

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
    }, [refreshKey]);

    //Elválasztás

    const getItemList = async () => {
        try {
            const data = await getDocs(itemsCollectionRef);
            const filteredItems = data.docs
                .map((doc, index) => ({
                    ...doc.data(),
                    id: doc.id,
                    img: imageList[index],
                    like: doc.data().like,
                    userId: doc.data().userId
                }))
                .filter((item) => item.like === "true" || item.userId === user?.uid);

            setItemList(filteredItems);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getItemList();
    }, [refreshKey]);

    const handleUnlikeItem = () => {
        setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey
    };


    return (
        <div className="listingBackground">
            <Container className="mb-4">
            <h1>{title}</h1>
            <div>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (itemList.length < 1
                        ? `Jelenleg nincsen kedvenc hirdetésed`
                        : <Row md={2} xs={1} lg={4} className={"g-3"}>
                            {itemList.map(
                                (item: {
                                    price: number;
                                    title: string;
                                    id: number;
                                    images: string;
                                    
                                }) => (
                                    <Col key={item.id}>
                                        <StoreItem seller={""} sellerId={""} onLikeUpdate={handleUnlikeItem} itemType={""} {...item} />
                                    </Col>
                                )
                            )}
                        </Row>
                )}
            </div>
            </Container>
        </div>
    );
}