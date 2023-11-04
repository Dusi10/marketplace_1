import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../config/firebase";
import { addDoc, collection, query, where, getDocs, deleteDoc } from "firebase/firestore";
import { Navigate, useNavigate } from "react-router-dom";

export interface ItemProps {
  id: string | number,
  title: string,
  description?: string,
  price: number,
  images: string,
  itemType: string,
  onLikeUpdate: VoidFunction,
  seller: string
}

export const StoreItem = ({ id, title, price, images, description, itemType, onLikeUpdate, seller }: ItemProps) => {
  const [hovered, setHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  useEffect(() => {
    const checkLikeStatus = async () => {
      const likeCollectionRef = collection(db, "Likes");
      const q = query(likeCollectionRef, where("userId", "==", user?.uid), where("images", "==", images));

      try {
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };

    checkLikeStatus();
  }, []);

  const likeItem = async () => {
    const likeCollectionRef = collection(db, "Likes");

    try {
      const q = query(likeCollectionRef, where("userId", "==", user?.uid), where("images", "==", images));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (doc) => {
          setIsLiked(false);
          await deleteDoc(doc.ref);
        });
      } else {
        setIsLiked(true);
        await addDoc(likeCollectionRef, {
          like: true,
          images: images,
          userId: user?.uid,
          price: price,
          title: title,
        });
      }
      onLikeUpdate()
    } catch (error) {
      console.error("Error adding/removing like:", error);
    }
  };

  const handleText = () => {
    setHovered(!hovered);
  };

  const sendMessage = () => {
    navigate("/ChatPage")
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
          {seller &&
          <button className="custom-button fill-button" onClick={sendMessage}>
            Eladó: {seller} 
          </button>
          }
        </div>
      </div>
    </div>
  );
};
