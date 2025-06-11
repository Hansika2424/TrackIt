import { auth, provider } from "../../config/firebase-config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "./styles.css";

export const Auth = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const results = await signInWithPopup(auth, provider);
    const authInfo = {
      userID: results.user.uid,
      name: results.user.displayName,
      profilePhoto: results.user.photoURL,
      isAuth: true,
    };
    localStorage.setItem("auth", JSON.stringify(authInfo));
    navigate("/expense-tracker");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h1 className="main-heading">TrackIt</h1>
        <h3 className="sub-heading">Track your finances here</h3>
        <p className="info-text">
          Please sign in with Google to continue
        </p>


        <button className="login-with-google-btn" onClick={signInWithGoogle}>
        <FcGoogle size={22} />
        <span>Sign in with Google</span>
        </button>

      </div>
    </div>
  );
};
