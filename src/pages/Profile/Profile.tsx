import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import { collection, query, where, getDocs, DocumentData, addDoc } from "firebase/firestore";
import { set } from "react-hook-form";
import { SellItem } from "../SellItem";

interface SellerUser {
    email: string;
    picture: string;
    uid: string;
    username: string;
}

const Profile = () => {
    const [user] = useAuthState(auth);
    const { sellerId } = useParams<{ sellerId: string }>(); // Get the seller's ID from the URL

    const [seller, setSeller] = useState<SellerUser | undefined>();
    const [itemNumber, setItemNumber] = useState<number>(0);

    const [positivRating, setPositivRating] = useState<number>(0);
    const [negativRating, setNegativRating] = useState<number>(0);

    const [userCanRate, setUserCanRate] = useState<boolean>(true);

    const fetchSellerData = async () => {
        const q = query(collection(db, "UsersData"), where("uid", "==", sellerId));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                querySnapshot.forEach((doc) => {
                    setSeller(doc.data() as SellerUser);
                });
            } else {
                console.log("No user found with the provided ID");
            }
        } catch (error) {
            console.log("Error while searching for users:", error);
        }
    };

    const fetchSellerItemNumber = async () => {
        const q = query(collection(db, "Item"), where("userId", "==", sellerId));

        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                setItemNumber(querySnapshot.size);
            } else {
                console.log("No user found with the provided ID");
            }
        } catch (error) {
            console.log("Error while searching for users:", error);
        }
    }
    const fetchSellerRating = async () => {
        const qPositive = query(collection(db, "rating"),
            where("receiverId", "==", sellerId),
            where("ratingType", "==", "Igen"));

        const qNegative = query(collection(db, "rating"),
            where("receiverId", "==", sellerId),
            where("ratingType", "==", "Nem"));

        try {
            const querySnapshotPositive = await getDocs(qPositive);
            const querySnapshotNegative = await getDocs(qNegative);
            setPositivRating(querySnapshotPositive.size);
            setNegativRating(querySnapshotNegative.size);
        } catch (error) {
            console.log("Error while fetching ratings:", error);
        }
    }

    const newRating = {
        senderId: user?.uid, // The ID of the user giving the rating
        receiverId: sellerId, // The ID of the user being rated
        ratingType: "Megbízható", // Or "Nem Megbízható"
    };

    const onSubmitData = async (rating: string) => {
        const q = query(collection(db, "rating"), where("senderId", "==", user?.uid), where("receiverId", "==", sellerId))
        const querySnapshot = await getDocs(q);
        const ratingsRef = collection(db, "rating");
        const newRating = {
            senderId: user?.uid,
            receiverId: sellerId,
            ratingType: rating,
        };
        try {
            if (!querySnapshot.empty) {
                setUserCanRate(false);
                alert("Már értékelted ezt a felhasználót!")
            } else {
                await addDoc(ratingsRef, newRating); {
                    setUserCanRate(true);
                    alert("Sikeres értékelés!")
                }
            };
        } catch (error) {
            console.log("Error while adding rating:", error);
        }
    };



    useEffect(() => {
        fetchSellerData();
        fetchSellerItemNumber();
        fetchSellerRating();
    }, [sellerId]);

    const likeUser = () => {
        onSubmitData("Igen");
        fetchSellerRating();
    }
    const disLikeUser = () => {
        onSubmitData("Nem")
        fetchSellerRating();
    }

    return (
        <div className="listingBackground">
            <div>

                <h1 style={{ marginBottom: "50px", display: "flex", justifyContent: "center" }}>{seller?.username} Profilja </h1>
            </div>
            <div style={{ marginInlineStart: "20px" }}>
                <div style={{ display: "grid", alignItems: "center", margin: "20px" }}>
                    <img style={{ borderRadius: "50px", }} src={seller?.picture} alt="Profile Picture" />
                    <p>{seller?.username} </p>

                </div>
                
                {user?.uid !== sellerId  &&
                    <div style={{ display: "flex", justifyContent: "space-between", maxWidth: "600px" }}>
                        <p>Értékelje {seller?.username}-t </p>
                        <button className={"custom-button fill-button"} onClick={likeUser}>Megbízható</button>
                        <button className={"custom-button fill-button"} onClick={disLikeUser}>Nem Megbízható</button>

                    </div>
                }
                <div style={{margin: "20"}}>
                    <p>Pozitív értékelések száma: {positivRating} </p>
                    <p>Negatív értékelések száma: {negativRating} </p>
                    <p>Hirdetések száma: {itemNumber} </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;
