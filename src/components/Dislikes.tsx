import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import filledRedHeart from "../pictures/filledredheart.png";
import unfilledRedHeart from "../pictures/unfilledredheart.png";

interface Like {
  userId: string;
}

export const Likes = () => {
  const likesRef = collection(db, "Like");
  const disLikesRef = collection(db, "DisLike");

  const [user] = useAuthState(auth);

  const [like, setLike] = useState<Like[] | null>(null);
  const [isLiked, setIsLiked] = useState(false)
  const [disLike, setDisLike] = useState<Like[] | null>(null);

  const LikesDoc = query(likesRef);
  const disLikesDoc = query(disLikesRef);

  const getLikes = async () => {
    const data = await getDocs(LikesDoc);
    setLike(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };
  const getDislikes = async () => {
    const disLikesData = await getDocs(disLikesDoc);
    setDisLike(disLikesData.docs.map((doc) => ({ userId: doc.data().userId })));
  };
  // To make sure that one user can only once like or dislike I added the users auth state which keeps track on whose logged in and also when the user like or dislikes it uploades a userId to the firebase database and the code below checks if that userId is equal to the user.uid which is uploaded to the firebase then the person cant like it anymore, also I added a delet function as well so if the like button is pressed again he can take back the like which he gave and the users uid will be deleted from the firebqase too so he will be able to like it again if he wants to.
  const addLike = async () => {
    // const userLikesQuery = query(likesRef, where("userId", "==", user?.uid));
    // const userLikes = await getDocs(userLikesQuery);
    setIsLiked(!isLiked)

    // if (userLikes.size === 0) {
    //   await addDoc(likesRef, { userId: user?.uid });
    //   await getLikes();
    // } else {
    //   await deleteDoc(doc(likesRef, userLikes.docs[0].id));
    //   await getLikes();
    // }
  };
  // isLiked ot az adott érték ellentettjére kell állítani, illetve a likeCountot növel 1 el ha az isliked true ha false akkor csökkentenő 1 el

  const addDisLike = async () => {
    const userDisLikesQuery = query(
      disLikesRef,
      where("userId", "==", user?.uid)
    );
    const userDisLikes = await getDocs(userDisLikesQuery);

    if (userDisLikes.size === 0) {
      await addDoc(disLikesRef, { userId: user?.uid });
      await getDislikes();
    } else {
      await deleteDoc(doc(disLikesRef, userDisLikes.docs[0].id));
      await getDislikes();
    }
  };

  useEffect(() => {
    getLikes();
    getDislikes();
  }, []);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>

        {like && like.length > 0 && <p>Likes: {like?.length} </p>}
        <img
            onClick={addLike}
            src={isLiked ? filledRedHeart : unfilledRedHeart}
            style={{
              width: "30px",
              height: "30px",
              cursor: "pointer"
            }}
        />
      </div>
    </div>
  );
};
