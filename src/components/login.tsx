import { signInWithPopup } from "firebase/auth";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../formating/user.css";
import { signOut } from "firebase/auth";

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
    <div>
      {user ? (
        <div className="user-info">
          <span>{user.displayName}</span>
          <Button onClick={signUserOut} variant="outline-primary" >Logout</Button>
        </div>
      ) : (
        <div>
          <Button onClick={signInWithGoogle} variant="outline-primary">Login</Button>
        </div>
      )}
    </div>
  );
};