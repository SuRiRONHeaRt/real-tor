import { useEffect } from "react";
import { useState } from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const useAuthStatus = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      }
      setLoading(false);
    });
  }, []);
  return { loggedIn, loading };
};

export { useAuthStatus };
