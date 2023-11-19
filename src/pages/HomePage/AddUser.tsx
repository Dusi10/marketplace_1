import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { addDoc, collection, query, where, getDocs, setDoc, doc } from 'firebase/firestore';
import { Modal } from 'react-bootstrap';

interface Props {
  modalIsOpen: boolean;
  modalTitle: string;
  modalText: string;
  buttonAccept: () => void;
  buttonCancel: () => void;
  modalAcceptButton: string;
  modalDenyButton: string;
}

const AddUser = ({modalIsOpen,  modalTitle, modalText, buttonAccept, buttonCancel, modalAcceptButton, modalDenyButton}:Props) => {
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
        const q = query(userCollectionRef, where('username', '==', name));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.size > 0) {
          // User already exists in the collection
          setUserExists(true);
        } else {
          setUserExists(false);
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
        await setDoc(doc(db, "userChats", user.uid), {});
        buttonAccept();
      }
    } catch (err) {
      console.error('Error adding user data:', err);
    }
  };

  return (
    <div>
        <>
          {!userExists && (
            <Modal show={modalIsOpen} style={{border: "2px solid black"}}>
            <h2 style={{ paddingInline: "10px", color: "black" }}>{modalTitle}</h2>
            <p style={{ paddingInline: "10px", color: "blue" }}>{modalText}</p>
            <div style={{ display: "flex", justifyContent: "space-between", paddingInline: "10px", paddingBottom: "10px" }}>
              <button className={"custom-button fill-button"} onClick={onSubmitData}> {modalAcceptButton} </button>
              <button className={"custom-button fill-button"} onClick={buttonCancel}> {modalDenyButton} </button>
            </div>
          </Modal>
          )}
        </>
    </div>
  );
};

export default AddUser;
