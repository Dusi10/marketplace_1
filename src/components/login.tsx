import { signInWithPopup } from "firebase/auth";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, provider, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../formating/user.css";
import { signOut } from "firebase/auth";
import { ProfileLogo } from "./ProfileLogo";
import { collection, getDocs, query, doc, setDoc, where, addDoc } from "firebase/firestore";
import { useState } from "react";

export const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const signInWithGoogle = async () => {

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      navigate("/");
      setModalIsOpen(true);
      
    }

  const signUserOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
      {!user && (
        <div>
          <Button onClick={signInWithGoogle} variant="outline-primary">Login</Button>
        </div>
      )}
      {user && (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ProfileLogo profilePicture={user.photoURL || ""} logOutLogic={signUserOut} />
        </div>
      )}
      <Modal show={modalIsOpen}>
        <h2>Alert</h2>
        <p>This is the alert text</p>
        <button onClick={() => setModalIsOpen(false)}>Close</button>
        <button onClick={() => { /* handle second button click */ }}>Second Button</button>
      </Modal>
    </div>
  );
};
