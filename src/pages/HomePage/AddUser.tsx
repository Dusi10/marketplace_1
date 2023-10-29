import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

const AddUser = () => {
  const userCollectionRef = collection(db, 'UsersData');
  const [user] = useAuthState(auth);

  const name = user?.displayName;
  const email = user?.email;
  const picture = user?.photoURL;
  const uid = user?.uid;

  const [userExists, setUserExists] = useState(false);

  // Use useEffect to check if the user already exists in the 'UsersData' collection
  useEffect(() => {
    const checkUserExistence = async () => {
      if (user) {
        const q = query(userCollectionRef, where('uid', '==', uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          // User already exists in the collection
          setUserExists(true);
        }
      }
    };

    checkUserExistence();
  }, [user, uid, userCollectionRef]);

  const onSubmitData = async () => {
    try {
      // Check if the user is authenticated and doesn't exist in the list
      if (user && !userExists) {
        const userData = {
          email: email,
          picture: picture,
          uid: uid,
          username: name,
        };

        await addDoc(userCollectionRef, userData);
      }
    } catch (err) {
      console.error('Error adding user data:', err);
    }
  };

  return (
    <div>
      {user ? (
        <>
          {userExists ? (
            <p>User already exists in the list.</p>
          ) : (
            <button onClick={onSubmitData} style={{ color: 'black' }}>
              Add User Data
            </button>
          )}
          <p>Email: {user.email}</p>
          <p>UID: {user.uid}</p>
          <p>Display Name: {user.displayName}</p>
          <p>Photo URL: {user.photoURL}</p>
        </>
      ) : (
        <p>Please sign in to add user data.</p>
      )}
    </div>
  );
};

export default AddUser;
