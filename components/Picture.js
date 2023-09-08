import React, { useRef, useState } from "react";
import { database, upload, useAuth } from "@/firebaseconfig";
import { generateRandomId } from "@/helper";
import { doc, setDoc } from "firebase/firestore";
import Sidebar from "./SideBar";

const Picture = () => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [desc, setDesc] = useState("");
  const inputRef = useRef(null);
  const currentUser = useAuth();
  const randomId = generateRandomId();
  const handleFileChange = async (event) => {
    const selectedImage = event.target.files[0];
    const photoURL = await upload(selectedImage, currentUser?.uid, randomId);
    setUploadedImages([...uploadedImages, photoURL]);
  };

  const onAddHandler = (e) => {
    e.preventDefault();
    if (!currentUser?.uid) return;
    const imageObj = {
      id: currentUser?.uid,
      description: desc,
      imageUrls: uploadedImages,
    };
    // if (!businessInfo?.id) {
    try {
      setDoc(doc(database, "image info", `${currentUser?.uid}`), imageObj).then(
        () => {
          alert("Image info add successfully");
        }
      );
    } catch (error) {
      console.log(error);
    }
    // } else {
    // updateDoc(doc(database, "image info", `${currentUser?.uid}`), businessObj)
    //   .then(() => {
    //     alert("Image info update successfully");
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  };
  return (
    <div className="flex gap-4">
      <Sidebar />
      <div className="flex-1">
        <p className="text-center text-2xl font-bold text-teal-500">
          Picture Information
        </p>

        <div className="flex items-center flex-col gap-6 mt-8 mb-4">
          <div className="flex gap-2">
            <label className="font-bold">Description: </label>
            <textarea
              type="text"
              placeholder="Enter your description...."
              className="input input-bordered w-64 max-w-xs h-20"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              cols={4}
            />
          </div>
          <div className="h-2/3">
            <div className="w-96 p-6 bg-gray-100 rounded shadow-lg">
              <h1 className="text-xl font-semibold mb-4">Picture</h1>
              <div className="flex flex-col items-center space-y-4">
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() => inputRef?.current?.click()}
                >
                  Upload pictures
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={inputRef}
                  className="hidden"
                  multiple
                  onChange={handleFileChange}
                />
                <p className="text-gray-500 text-sm">
                  Select one or more pictures
                </p>
              </div>
              <div className="mt-4 space-y-2 flex flex-wrap gap-4">
                {uploadedImages.map((imageUrl, index) => (
                  <img
                    key={index}
                    src={imageUrl}
                    alt={`Uploaded ${index + 1}`}
                    className="w-14 h-14 object-cover rounded-md shadow-md"
                  />
                ))}
              </div>
            </div>
          </div>
          <button
            className="btn btn-primary w-28 cursor-pointer"
            onClick={onAddHandler}
          >
            ADD
          </button>
        </div>
      </div>
    </div>
  );
};

export default Picture;
