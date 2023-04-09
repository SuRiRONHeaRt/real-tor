import React from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { db, auth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const OAuth = () => {
  //*Initialize navigate
  const navigate = useNavigate();

  const onGoogleClick = async () => {
    try {
      ////*get google authentication
      const provider = new GoogleAuthProvider();
      //*Add signin with popup
      const result = await signInWithPopup(auth, provider);
      //*assign it to the user
      const user = result.user;
      //*check if the user is in the database
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
      }
      navigate("/");
    } catch (error) {
      toast.error("Couldn't Authorize With Google");
    }
  };

  return (
    <button
      type="button"
      onClick={onGoogleClick}
      className="flex items-center justify-center
    w-full bg-red-700 text-white px-7 py-3 touch-pan-up
    text-sm font-medium hover:bg-red-800 
    active:bg-red-900 shadow-md hover:shadow-lg
    active:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2
    transition duration-150 ease-in-out rounded"
    >
      <FcGoogle
        className="taxt-2xl bg-white rounded-full
      mr-2"
      />
      Continue with Google
    </button>
  );
};

export default OAuth;
