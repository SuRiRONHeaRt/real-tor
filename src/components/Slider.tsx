import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import Spinner from "./Spinner";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  EffectFade,
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";
import "swiper/css/bundle";
import { useNavigate } from "react-router";

const Slider = () => {
  const [listings, setListings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([EffectFade, Autoplay, Navigation, Pagination]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      const listingsRef = collection(db, "listings");
      const q = query(listingsRef, orderBy("timestamp", "desc"), limit(5));
      const querySnap = await getDocs(q);
      let listings: any = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchListings();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: "progressbar" }}
          effect="fade"
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map((listing: any) => (
            <SwiperSlide
              key={listing.id}
              onClick={() =>
                navigate(`/category/${listing.data.type}/${listing.id}`)
              }
            >
              <div
                style={{
                  background: `url(${listing.data.imgUrls[0]}) center, no-repeat`,
                  backgroundSize: "cover",
                }}
                className="relative w-full h-[300px] overflow-hidden"
              ></div>
              <p
                className="text-[#f1faee] absolute left-1 top-3
              font-medium max-w-[90%] bg-[#457b9d] shadow-lg opacity-90
              p-2 rounded-br-3xl"
              >
                {listing.data.name}
              </p>
              <p
                className="text-[#f1faee] absolute left-1 bottom-1
              font-semibold max-w-[90%] bg-[#e63946] shadow-lg opacity-90
              p-2 rounded-br-3xl"
              >
                Rs.&nbsp;
                {listing.data.discountedPrice
                  ? listing.data.discountedPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  : listing.data.regularPrice
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                {listing.data.type === "rent" && " / month"}
              </p>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
