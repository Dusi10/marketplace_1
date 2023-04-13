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

interface Like {
  userId: string;
}

export const Likes = () => {
  const likesRef = collection(db, "Like");
  const disLikesRef = collection(db, "DisLike");

  const [user] = useAuthState(auth);

  const [like, setLike] = useState<Like[] | null>(null);
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
    const userLikesQuery = query(likesRef, where("userId", "==", user?.uid));
    const userLikes = await getDocs(userLikesQuery);

    if (userLikes.size === 0) {
      await addDoc(likesRef, { userId: user?.uid });
      await getLikes();
    } else {
      await deleteDoc(doc(likesRef, userLikes.docs[0].id));
      await getLikes();
    }
  };

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
  // a useeffect needed to re render the states when it changes so we can see the new values without updating the page
  useEffect(() => {
    getLikes();
    getDislikes();
  }, []);

  return (
    <div>
      <div className="">
        {/* I added an extra which checks if the counter is higher then 0 if its not it wont show the likes or dislikes with the counter to keep it more clean 
         */}
        <Button variant="outline-primary" onClick={addLike}>
          &#128077;
        </Button>
        {like && like.length > 0 && <p>Likes: {like?.length} </p>}
        <Button variant="outline-primary" onClick={addDisLike}>
          &#128078;
        </Button>
        {disLike && disLike.length > 0 && <p>Dislikes: {disLike?.length} </p>}
      </div>
    </div>
  );
};
