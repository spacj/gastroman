import { businessAtom } from "@/atom/global.atom";
import { database, upload, useAuth } from "@/firebaseconfig";
import { generateRandomId } from "@/helper";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

const BusinessInfo = () => {
  const [businessInfo, setBusinessInfo] = useRecoilState(businessAtom);
  const [name, setName] = useState("");
  const [logo, setLogo] = useState("");
  const [address, setAddress] = useState("");
  const [vatNo, setVatNo] = useState("");
  const [socityName, setSocityName] = useState("");
  const [openingTime, setOpening] = useState("");
  const [contacts, setContacts] = useState("");
  const [story, setStory] = useState("");

  const currentUser = useAuth();
  const getBusinessData = async (currentUserId) => {
    await getDocs(collection(database, "business info")).then(
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        const currCompany = data?.filter((info) => info?.id === currentUserId);
        console.log(currCompany);
        setBusinessInfo(currCompany[0]);
      }
    );
  };

  useEffect(() => {
    if (!currentUser?.uid) return;
    getBusinessData(currentUser.uid);
  }, [currentUser?.uid]);
  const handleFileChange = async (event) => {
    const selectedImage = event.target.files[0];
    const randomId = generateRandomId();
    const photoURL = await upload(selectedImage, currentUser?.uid, randomId);
    setLogo(photoURL);
  };

  const handleInfo = (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;
    const businessObj = {
      id: currentUser?.uid,
      businessName: name || businessInfo?.businessName,
      logo: logo || businessInfo?.logo,
      address: address || businessInfo?.address,
      vatNo: vatNo || businessInfo?.vatNo,
      socityName: socityName || businessInfo?.socityName,
      openingTime: openingTime || businessInfo?.openingTime,
      contacts: contacts || businessInfo?.contacts,
      story: story || businessInfo?.story,
    };
    if (!businessInfo?.id) {
      try {
        setDoc(
          doc(database, "business info", `${currentUser?.uid}`),
          businessObj
        ).then(() => {
          alert("Business info add successfully");
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      updateDoc(
        doc(database, "business info", `${currentUser?.uid}`),
        businessObj
      )
        .then(() => {
          alert("Business info update successfully");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="mt-14 w-1/2">
      <form onSubmit={handleInfo}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="grid md:grid-cols-2 md:gap-6">
            <div className="relative z-0 w-full mb-6 group">
              <input
                type="text"
                name="floating_vatno"
                id="floating_vatno"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                value={name || businessInfo?.businessName}
                onChange={(e) => setName(e.target.value)}
              />
              <label
                for="floating_country"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Business Name
              </label>
            </div>
          </div>

          <div className="relative z-0 w-full mb-6 group flex items-center">
            <div>
              <input
                type="file"
                name="floating_last_name"
                id="floating_last_name"
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
                accept="image/*"
                onChange={handleFileChange}
              />
              <label
                for="floating_last_name"
                className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
              >
                Logo
              </label>
            </div>
            <img
              src={logo || businessInfo?.logo}
              className="w-10 h-10"
              alt=""
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_city"
              id="floating_city"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={address || businessInfo?.address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label
              for="floating_city"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Address
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_vatno"
              id="floating_vatno"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={vatNo || businessInfo?.vatNo}
              onChange={(e) => setVatNo(e.target.value)}
            />
            <label
              for="floating_country"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Vat No
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_socityName"
              id="floating_socityName"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={socityName || businessInfo?.socityName}
              onChange={(e) => setSocityName(e.target.value)}
            />
            <label
              for="floating_socityName"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Socity Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              name="floating_openingTime"
              id="floating_openingTime"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={openingTime || businessInfo?.openingTime}
              onChange={(e) => setOpening(e.target.value)}
            />
            <label
              for="floating_openingTime"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Opening Hours
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_contacts"
              id="floating_contacts"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={contacts || businessInfo?.contacts}
              onChange={(e) => setContacts(e.target.value)}
            />
            <label
              for="floating_contacts"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Contacts
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_story"
              id="floating_story"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={story || businessInfo?.story}
              onChange={(e) => setStory(e.target.value)}
            />
            <label
              for="floating_story"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Story
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default BusinessInfo;
