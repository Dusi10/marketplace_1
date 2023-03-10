import { useNavigate } from "react-router-dom";
import { auth, provider } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "../formating/user.css";

export const User = () => {
  const [user] = useAuthState(auth);
  return (
    <>
      <div className="user-container">
        <img 
          className="user-image"
          src={user?.photoURL || ""}
          alt="User profile"
        />
        <p className="user-name">{user?.displayName}</p>
      </div>
    </>
  );
};
