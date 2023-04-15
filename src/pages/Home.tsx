import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import Spinner from "../components/Spinner";

const Home = () => {
  return (
    <div>
      <Slider />
    </div>
  );
};

export default Home;
