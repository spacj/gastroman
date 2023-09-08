import React, { useState } from "react";
import { database, useAuth } from "@/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";

const Mission = () => {
  const [mission, setMission] = useState("");

  const currentUser = useAuth();
  const onAddHandler = (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;
    const missionObj = {
      id: currentUser?.uid,
      description: mission,
    };
    // if (!businessInfo?.id) {
    try {
      setDoc(doc(database, "mission", `${currentUser?.uid}`), missionObj).then(
        () => {
          alert("mission add successfully");
        }
      );
    } catch (error) {
      console.log(error);
    }
    // } else {
    // updateDoc(doc(database, "mission", `${currentUser?.uid}`), businessObj)
    //   .then(() => {
    //     alert("Image info update successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <div className="flex justify-center items-center gap-4 flex-col">
        <label className="font-bold">Write About Your Mission: </label>
        <textarea
          type="text"
          placeholder="Enter your company mission...."
          className="input input-bordered w-48 max-w-xs h-44 md:w-96"
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          cols={8}
        />
      </div>
      <div className="flex justify-center">
        <button
          className="px-4 py-2 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={onAddHandler}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default Mission;
