import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, limitToLast } from "firebase/firestore";
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
import {
  FaBath,
  FaShare,
  FaMapMarkerAlt,
  FaBed,
  FaParking,
  FaChair,
} from "react-icons/fa";
import Contact from "../components/Contact";

const Listing = () => {
  const params: any = useParams();
  const [listing, setListing] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const [shareLinkCopy, setShareLinkCopy] = useState(false);
  const [contactLandlord, setContactLandlord] = useState(false);

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
      <div
        className="fixed top-[13%] right-[3%] z-10 bg-white cursor-pointer
      border-2 border-gray-400 rounded-full w-12 h-12 flex justify-center
      items-center"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setShareLinkCopy(true);
          setTimeout(() => {
            setShareLinkCopy(false);
          }, 2000);
        }}
      >
        <FaShare className="text-lg text-slate-500" />
      </div>
      {shareLinkCopy && (
        <p
          className="fixed top-[23%] right-[5%]
      font-semibold border-2 border-gray-400 rounded-md bg-white
      z-10 p-2"
        >
          Link Copied
        </p>
      )}
      <div
        className="m-4 flex flex-col md:flex-row max-w-6xl lg:mx-auto p-4 
      rounded-lg shadow-lg bg-white lg:space-x-5"
      >
        <div className=" w-full ">
          <p
            className="text-2xl font-bold mb-3 text-blue-900
          "
          >
            {listing.name} - $
            {listing.offer
              ? listing.discountedPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              : listing.regularPrice
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            {listing.type === "rent" ? " per month" : ""}
          </p>
          <p className="flex items-center mt-6 mb-3 font-semibold">
            <FaMapMarkerAlt className="text-green-700 mr-1" />
            {listing.address}
          </p>
          <div
            className="flex justify-start items-center 
          space-x-4 w-[75%]"
          >
            <p
              className="bg-red-800 w-full max-w-[200px]
            rounded-md p-1 text-white text-center font-semibold
            shadow-md"
            >
              {listing.type === "rent" ? "Rent" : "Sale"}
            </p>

            {listing.offer && (
              <p
                className="w-full mx-w-[200opx] bg-green-800
                rounded-md p-1 text-white text-center font-semibold
                shadow-md"
              >
                ${+listing.regularPrice - +listing.discountedPrice} Discount
              </p>
            )}
          </div>
          <p className="mt-3 mb-3">
            <span className="font-semibold">Description - </span>
            {listing.description}
          </p>
          <ul className="flex space-x-2 sm:space-x-10 text-sm font-semibold mb-6">
            <li className="flex items-center whitespace-nowrap">
              <FaBed className="text-lg mr-1" />
              {+listing.bedrooms > 1 ? `${listing.bedrooms} Beds` : "1 Bed"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaBath className="text-lg mr-1" />
              {+listing.bathrooms > 1 ? `${listing.bathrooms} Baths` : "1 Bath"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaParking className="text-lg mr-1" />
              {listing.parking ? "Parking Available" : "No Parking Available"}
            </li>
            <li className="flex items-center whitespace-nowrap">
              <FaChair className="text-lg mr-1" />
              {listing.furnished ? "Furnished" : "Not Furnished"}
            </li>
          </ul>
          {listing.userRef !== auth.currentUser?.uid && !contactLandlord && (
            <div className="mt-6">
              <button
                onClick={() => setContactLandlord(true)}
                className="px-7 py-3 bg-blue-600 text-white
          font-medium text-sm uppercase rounded shadow-md
          hover:bg-blue-700 hover:shadow-lg 
          focus:bg-blue-700 focus::shadow-lg
          w-full text-center transition duration-150 ease-in-out"
              >
                Contact Landlord
              </button>
            </div>
          )}
          {contactLandlord && (
            <Contact userRef={listing.userRef} listing={listing} />
          )}
        </div>
        <div
          className=" bg-blue-300 w-full h-[200px] lg-[400px]
        z-10 overflow-x-hidden"
        ></div>
      </div>
    </main>
  );
};

export default Listing;