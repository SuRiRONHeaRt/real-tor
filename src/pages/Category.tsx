import {
  collection,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { db } from "../firebaseConfig";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";
import { useParams } from "react-router";

const Category = () => {
  const [offers, setOffers] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState<any>(null);
  const params: any = useParams();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const listingRef = collection(db, "listings");
        const q = query(
          listingRef,
          where("type", "==", params.categoryName),
          orderBy("timestamp", "desc"),
          limit(4)
        );
        const querySnap = await getDocs(q);
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);
        const listings: any = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setOffers(listings);
        setLoading(false);
      } catch (error: any) {
        toast.error("Couldn't fetch offers");
      }
    };
    fetchOffers();
  }, [params.categoryName]);

  const onFetchMoreListing = async () => {
    try {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("type", "==", params.categoryName),
        orderBy("timestamp", "desc"),
        startAfter(lastFetchedListing),
        limit(4)
      );
      const querySnap = await getDocs(q);
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);
      const listings: any = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setOffers((prevState: any) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error: any) {
      toast.error("Couldn't fetch offers");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-3">
      <h1 className="text-3xl text-center mt-6 font-bold mb-6">
        {params.categoryName === "rent"
          ? "Places For Rent"
          : "Places For Sales"}
      </h1>
      {loading ? (
        <Spinner />
      ) : offers && offers.length > 0 ? (
        <>
          <main>
            <ul
              className="sm:grid sm:grid-cols-2 lg:grid-cols-3
              xl:grid-cols-4 2xl:grid-cols-4"
            >
              {offers.map((offer: any) => (
                <ListingItem
                  key={offer.id}
                  id={offer.id}
                  listing={offer.data}
                />
              ))}
            </ul>
          </main>
          {lastFetchedListing && (
            <div className="flex justify-center items-center">
              <button
                className="bg-white px-3 py-1.5 text-gray-700
                border border-gray-300 mb-6 mt-6 hover:border-slate-600
                rounded transition duration-150 ease-in-out"
                onClick={onFetchMoreListing}
              >
                Load More
              </button>
            </div>
          )}
        </>
      ) : (
        <p>There are no current offers</p>
      )}
    </div>
  );
};

export default Category;
