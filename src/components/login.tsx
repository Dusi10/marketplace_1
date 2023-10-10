import { signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../formating/user.css";
import { signOut } from "firebase/auth";
import {ProfileLogo} from "./ProfileLogo";

// Logic for Google authenticator
export const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
    navigate("/");
  };
  const signUserOut = async () => {
    await signOut(auth);
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
                  <ProfileLogo profilePicture={user?.photoURL || ""} logOutLogic={signUserOut}/>
              </div>
          )}
      </div>
  );
};
