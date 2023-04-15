import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { Link } from "react-router-dom";

const Home = () => {
  //TODO: Offers
  const [offerListings, setOfferListings] = useState<any>(null);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        //get the reference
        const listingsRef = collection(db, "listings");
        //create the query
        const q = query(
          listingsRef,
          where("offer", "==", true),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute the query
        const querySnap = await getDocs(q);
        const listings: any = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOfferListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOffers();
  }, []);
  //TODO: Places for Rent
  const [rentListings, setRentListings] = useState<any>(null);

  useEffect(() => {
    const fetchRents = async () => {
      try {
        //get the reference
        const listingsRef = collection(db, "listings");
        //create the query
        const q = query(
          listingsRef,
          where("type", "==", "rent"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute the query
        const querySnap = await getDocs(q);
        const listings: any = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setRentListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRents();
  }, []);

  //TODO: Places for Rent
  const [saleListings, setSaleListings] = useState<any>(null);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        //get the reference
        const listingsRef = collection(db, "listings");
        //create the query
        const q = query(
          listingsRef,
          where("type", "==", "sale"),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        //execute the query
        const querySnap = await getDocs(q);
        const listings: any = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setSaleListings(listings);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSales();
  }, []);

  return (
    <div>
      <Slider />
      <div className="max-w-6xl mx-auto pt-4 space-y-6">
        {offerListings && offerListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">Recent Offers</h2>
            <Link to="/offers">
              <p
                className="px-3 text-sm text-blue-600
              hover:text-blue-800 transition duration-150
              ease-in-out"
              >
                Show More Offers...
              </p>
            </Link>
            <ul
              className="sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4"
            >
              {offerListings.map((offer: any) => (
                <ListingItem
                  key={offer.id}
                  id={offer.id}
                  listing={offer.data}
                />
              ))}
            </ul>
          </div>
        )}
        {rentListings && rentListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for Rent
            </h2>
            <Link to="/category/rent">
              <p
                className="px-3 text-sm text-blue-600
              hover:text-blue-800 transition duration-150
              ease-in-out"
              >
                Show More Places For Rent...
              </p>
            </Link>
            <ul
              className="sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4"
            >
              {rentListings.map((offer: any) => (
                <ListingItem
                  key={offer.id}
                  id={offer.id}
                  listing={offer.data}
                />
              ))}
            </ul>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="m-2 mb-6">
            <h2 className="px-3 text-2xl mt-6 font-semibold">
              Places for Sale
            </h2>
            <Link to="/category/sale">
              <p
                className="px-3 text-sm text-blue-600
              hover:text-blue-800 transition duration-150
              ease-in-out"
              >
                Show More Places For Sale...
              </p>
            </Link>
            <ul
              className="sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4"
            >
              {saleListings.map((offer: any) => (
                <ListingItem
                  key={offer.id}
                  id={offer.id}
                  listing={offer.data}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
