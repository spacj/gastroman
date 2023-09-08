import React, { useEffect, useState } from "react";
import SideBar2 from "./SideBar2";
import { database, upload, useAuth } from "@/firebaseconfig";
import { generateRandomId } from "@/helper";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useRecoilState } from "recoil";
import { menuAtom } from "@/atom/global.atom";

const MenuCreate = () => {
  const [menuItems, setMenuItems] = useRecoilState(menuAtom);
  const [menuItem, setMenuItem] = useState(null);
  const [dishName, setDishName] = useState("");
  const [ind, setInd] = useState("");
  const [picture, setPicture] = useState("");

  const currentUser = useAuth();
  const getUserData = async (currentUserId) => {
    await getDocs(collection(database, "menu")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      const menus = data?.filter((menu) => menu?.id === currentUserId);
      console.log(menus);
      // setUserInfo(currUser[0]);
      setMenuItems(menus);
    });
  };
  console.log(menuItems);

  useEffect(() => {
    if (!currentUser?.uid) return;
    getUserData(currentUser.uid);
  }, [currentUser?.uid, menuItem]);

  const handleFileChange = async (event) => {
    const selectedImage = event.target.files[0];
    const randomId = generateRandomId();
    const photoURL = await upload(selectedImage, currentUser?.uid, randomId);
    setPicture(photoURL);
    alert("menu info add successfully");
  };

  const handleMenu = (e) => {
    e.preventDefault();
    console.log(picture);
    if (!picture) return;
    const randomId = generateRandomId();
    const menuObj = {
      id: currentUser?.uid,
      dishName,
      ingrediants: ind,
      picture,
    };
    try {
      setDoc(
        doc(database, "menu", `${currentUser?.uid + randomId}`),
        menuObj
      ).then(() => {
        setMenuItem(menuObj);
        setDishName("");
        setInd("");
        setPicture("");
        alert("menu info add successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full h-screen flex gap-4  items-center flex-col mt-16">
      <form onSubmit={handleMenu}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={dishName}
              onChange={(e) => setDishName(e.target.value)}
              required
            />
            <label
              for="floating_first_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Dish Name
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={ind}
              onChange={(e) => setInd(e.target.value)}
              required
            />
            <label
              for="floating_last_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Ingredients
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="file"
              name="floating_picture"
              id="floating_picture"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            <label
              for="floating_last_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Picture
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          SAVE
        </button>
      </form>
      <p className="text-2xl font-bold">Menu Items</p>
      <div className="flex-1 flex flex-col gap-4 md:flex-wrap md:flex-row justify-between w-1/2">
        {menuItems?.map((item, ind) => (
          <div key={ind} className="h-48 p-4 border border-black ">
            <h2 className="text-xl font-bold">{item?.dishName}</h2>
            <p>{item?.ingrediants}</p>
            <img className="h-16 w-full" src={item?.picture} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuCreate;
