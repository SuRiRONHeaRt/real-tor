import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Spinner from "../components/Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
// import "swiper/swiper-bundle.css";
import "swiper/css/bundle";

const Listing = () => {
  const params: any = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  useEffect(() => {
    const fetchListings = async () => {
      const docRef = doc(db, "listings", params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setListing(docSnap.data());
        setLoading(false);
      }
    };
    fetchListings();
  }, [params.id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: "progressbar" }}
        effect="fade"
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing.imgUrls.map((url: any, index: any) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full overflow-hidden h-[300px]"
              style={{
                background: `url(${listing.imgUrls[index]}) center no-repeat`,
                backgroundSize: "cover",
              }}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Listing;
