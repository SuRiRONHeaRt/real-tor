import React, { FormEvent, useEffect, useState } from "react";
import { db, auth } from "../firebaseConfig";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { User, updateProfile } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FcHome } from "react-icons/fc";
import ListingItem from "../components/ListingItem";

interface UserData {
  name: string;
  email: string;
}

const Profile = () => {
  const [listings, setListings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const [toggleEdit, setToggleEdit] = useState(false);

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName,
    email: auth.currentUser?.email,
  });

  const { name, email } = formData as UserData;

  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const onSubmit = async () => {
    try {
      //*update the display name in firebase authentication
      if (auth.currentUser?.displayName !== name) {
        await updateProfile(auth.currentUser as User, {
          displayName: name,
        });
        //* update the name in the firestore database
        const user = auth.currentUser as User;
        const docRef = doc(db, "users", user.uid);
        await updateDoc(docRef, {
          name: name,
        });
        toast.success("Profile updated");
      } else {
        toast.info("No Changes Made");
      }
    } catch (error) {
      toast.error("Could not update profile");
    }
  };

  useEffect(() => {
    const fetchUserListings = async () => {
      const listingRef = collection(db, "listings");
      const q = query(
        listingRef,
        where("userRef", "==", auth.currentUser?.uid),
        orderBy("timestamp", "desc")
      );
      const querySnapshot = await getDocs(q);
      let listings: any = [];
      querySnapshot.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setListings(listings);
      setLoading(false);
    };
    fetchUserListings();
  }, [auth.currentUser?.uid]);

  return (
    <>
      <section
        className="max-w-6xl mx-auto flex
      justify-center items-center flex-col"
      >
        <h1
          className="text-3xl text-center
        mt-6 font-bold"
        >
          My Profile
        </h1>
        <div className="w-full md:w-[50%] mt-6 px-3">
          <form>
            {/* name input */}
            <input
              className={`w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded
              transition duration-300 ease-in-out mb-6 ${
                toggleEdit && "bg-red-300 focus:bg-red-400"
              }`}
              type="text"
              id="name"
              value={name}
              disabled={!toggleEdit}
              onChange={onChange}
            />
            {/* Email Input */}
            <input
              className="w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded
              transition duration-300 ease-in-out mb-6"
              type="email"
              id="email"
              value={email}
              disabled
            />
            <div
              className="flex justify-between whitespace-nowrap
            text-sm sm:text-lg mb-6"
            >
              <p className="flex items-center">
                Do you want to change your name?
                <span
                  onClick={() => {
                    toggleEdit && onSubmit();
                    setToggleEdit(!toggleEdit);
                  }}
                  className="text-red-600 
                hover:text-red-700 transition duration-200
                ease-in-out ml-1 cursor-pointer"
                >
                  {toggleEdit ? "Apply Change" : "Edit"}
                </span>
              </p>
              <p
                onClick={onLogout}
                className="text-blue-600 hover:text-blue-800
              transition duration-200 ease-in-out cursor-pointer"
              >
                Sign Out
              </p>
            </div>
          </form>
          <button
            className=" w-full bg-blue-600 text-white
          uppercase px-7 py-3 text-sm font-medium rounded shadow-md
          hover:bg-blue-700 transition duration-150 ease-in-out
          hover:shadow-lg active:bg-blue-800"
            type="submit"
          >
            <Link
              className="flex justify-center items-center"
              to="/create-listing"
            >
              <FcHome
                className="mr-2 text-3xl bg-red-200
              rounded-full p-1 border-2"
              />
              Sell or Rent Your Home
            </Link>
          </button>
        </div>
      </section>
      <div className="max-w-6xl px-3 mt-6 mx-auto">
        {!loading && listings?.length > 0 && (
          <>
            <h2 className="text-2xl text-center font-semibold mb-6">
              My Listings
            </h2>
            <ul
              className="sm:grid sm:grid-cols-2
            lg:grid-cols-3 xl:grid-cols-4
            2xl-grid-cols-5 mt-6 mb-6"
            >
              {listings.map((listing: any) => (
                <ListingItem
                  key={listing.id}
                  id={listing.id}
                  listing={listing.data}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
