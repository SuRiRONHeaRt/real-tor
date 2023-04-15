import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import Listing from "./../pages/Listing";
import { toast } from "react-toastify";

interface Props {
  userRef: any;
  listing: any;
}

const Contact = ({ userRef, listing }: Props) => {
  const [landLord, setLandlord] = useState<any>(null);
  const [messages, setMessages] = useState("");

  useEffect(() => {
    const getLandlord = async () => {
      const docRef = doc(db, "users", userRef);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
      } else {
        toast.error("User does not exist");
      }
    };
    getLandlord();
  }, [userRef]);

  const onChange = (e: any) => {
    setMessages(e.target.value);
  };

  return (
    <>
      {landLord !== null && (
        <div className="flex flex-col w-full">
          <p className="mt-3">
            Contact {landLord.name} for the {listing.name.toLowerCase()}
          </p>
          <div className="mt-3 mb-6">
            <textarea
              name="message"
              id="message"
              rows={2}
              value={messages}
              onChange={onChange}
              placeholder="Type your message here..."
              className="w-full px-4 py-2 text-xl text-gray-700
              bg-white border border-gray-300 rounded transition
              duration-150 ease-in-out focus:text-gray-700 focus:
              bg-white focus:border-slate-600"
            ></textarea>
          </div>
          <a
            href={`mailto:${landLord.email}?Subject=${listing.name}&body=${messages}`}
          >
            <button
              className="px-7 py-3 bg-blue-600 text-white
            rounded text-sm uppercase shadow-md hover:bg-blue-700
            hover:shadow-lg focus:bg-blue-700 focus:shadow-lg
            active:bg-blue-800 active:shadow-lg transition duration-150
            ease-in-out w-full text-center mb-6"
              type="button"
            >
              Send Message
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default Contact;
