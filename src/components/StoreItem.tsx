import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";

export interface ItemProps {
  id: string | number,
  title: string,
  description?: string,
  price: number,
  images: string,
  itemType: string
}

export const StoreItem = ({ id, title, price, images, description, itemType }: ItemProps) => {
  const [hovered, setHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false); // Initialize as false
  const [user] = useAuthState(auth);

  useEffect(() => {
    // Check if the user has liked this item
    if (user) {
      const likesCollectionRef = collection(db, "Likes");
      const q = query(likesCollectionRef, where("userId", "==", user.uid), where("images", "==", images));
      
      getDocs(q).then((querySnapshot) => {
        if (!querySnapshot.empty) {
          // User has liked this item
          setIsLiked(true);
        } else {
          // User has not liked this item
          setIsLiked(false);
        }
      }).catch((error) => {
        console.error("Error checking like:", error);
      });
    }
  }, [user, images]);

  const likeItem = async () => {
    setIsLiked(!isLiked);

    const likeCollectionRef = collection(db, "Likes");

    try {
      if (isLiked) {
        // If already liked, remove the like
        const q = query(likeCollectionRef, where("userId", "==", user?.uid), where("images", "==", images));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            deleteDoc(doc.ref);
          });
        }
      } else {
        // If not liked, add the like
        await addDoc(likeCollectionRef, {
          like: true,
          images: images,
          userId: user?.uid,
          price: price,
          title: title,
        });
      }
    } catch (error) {
      console.error("Error adding/removing like:", error);
    }
  };

  const handleText = () => {
    setHovered(!hovered);
  };

  const sendMessage = () => {
    console.log("sendMessage function called");
    alert("Message sent");
  };

  return (
    <div>
      <div className="content-container">
        <div className="image-wrapper">
          <img src={images} className="banner-image" alt={title} />
          <h1 className="heading-text">{title}</h1>
          <h2 className="paragraph-text">{formatCurrency(price)}</h2>
        </div>
        <div className="button-wrapper">
          <div className={"custom-button fill-button"} onClick={likeItem}>
            {isLiked ? "Nem Tetszik" : "Tetszik"}
          </div>
          <button className="custom-button fill-button" onClick={sendMessage}>
            Küldj Üzenetet
          </button>
        </div>
      </div>
    </div>
  );
};
