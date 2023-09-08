import React, { useState } from "react";
import { database, upload, useAuth } from "@/firebaseconfig";
import { generateRandomId } from "@/helper";
import { doc, setDoc } from "firebase/firestore";

const MoreInfo = ({ isUnlimited = false }) => {
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [text, setText] = useState("");
  const [picture, setPicture] = useState("");
  const [fields, setFields] = useState([{ label: "", text: "" }]);

  const currentUser = useAuth();

  const handleAddField = () => {
    setFields([...fields, { label: `Label ${fields.length + 1}`, text: "" }]);
  };

  const handleTextChange = (event, index) => {
    const updatedFields = [...fields];
    updatedFields[index].text = event.target.value;
    setFields(updatedFields);
  };

  const handleLabelChange = (event, index) => {
    const updatedFields = [...fields];
    updatedFields[index].label = event.target.value;
    setFields(updatedFields);
  };

  const handleRemoveField = (index) => {
    const updatedFields = [...fields];
    updatedFields.splice(index, 1);
    setFields(updatedFields);
  };

  const handleFileChange = async (event) => {
    const selectedImage = event.target.files[0];
    const randomId = generateRandomId();
    const photoURL = await upload(selectedImage, currentUser?.uid, randomId);
    setPicture(photoURL);
  };

  const handleInfo = (e) => {
    e.preventDefault();
    console.log(picture);
    if (!picture) return;
    const randomId = generateRandomId();
    const infoObj = {
      id: currentUser?.uid,
      title,
      subTitle,
      text,
      picture,
      moreInfos: isUnlimited ? fields : [],
    };

    try {
      setDoc(
        doc(database, "more info", `${currentUser?.uid + randomId}`),
        infoObj
      ).then(() => {
        setTitle("");
        setSubTitle("");
        setPicture("");
        setText("");
        alert("Info add successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-14 w-1/2">
      <form onSubmit={handleInfo}>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_first_name"
              id="floating_first_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <label
              for="floating_first_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              required
            />
            <label
              for="floating_last_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Sub Title
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="floating_last_name"
              id="floating_last_name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />
            <label
              for="floating_last_name"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Text
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
              Image
            </label>
          </div>
        </div>
        {isUnlimited && (
          <div>
            {fields.map((field, index) => (
              <div key={index}>
                <div>
                  <label htmlFor={`textInput-${index}`}>Label:</label>
                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="text"
                    id={`labelInput-${index}`}
                    name={`labelInput-${index}`}
                    placeholder="Label"
                    value={field.label}
                    onChange={(event) => handleLabelChange(event, index)}
                  />
                </div>
                <div>
                  <label htmlFor={`textInput-${index}`}>input:</label>

                  <input
                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    type="text"
                    id={`textInput-${index}`}
                    name={`textInput-${index}`}
                    placeholder="Enter text"
                    value={field.text}
                    onChange={(event) => handleTextChange(event, index)}
                  />
                </div>
                <button
                  className="text-white my-4 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => handleRemoveField(index)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-12">
          {isUnlimited && (
            <button
              onClick={handleAddField}
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add More Info
            </button>
          )}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            SAVE
          </button>
        </div>
      </form>
    </div>
  );
};

export default MoreInfo;
