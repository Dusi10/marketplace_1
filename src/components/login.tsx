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
import AddUser from "../pages/HomePage/AddUser";

export const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const modalText = "Ha szeretné a chat szolgáltatásokat használni fogadja el az alábbi gomb megnyomásával, ha nem szeretné használni kattintson a nem fogadom el gombra"
  const modalTitle = "Figyelem"
  const modalAcceptButton = "Elfogadom"
  const modalDenyButton = "Nem Fogadom El"

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
      <AddUser
        modalIsOpen={modalIsOpen}
        modalTitle={modalTitle}
        modalText={modalText}
        buttonAccept={() => setModalIsOpen(false)}
        buttonCancel={() => setModalIsOpen(false)}
        modalAcceptButton={modalAcceptButton}
        modalDenyButton={modalDenyButton}
      />
    </div>
  );
};
