import { database } from "@/firebaseconfig";
import { generateRandomId } from "@/helper";
import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";

export function ContactForm({
  errorMessege,
  successMessage,
  vertical,
  dark,
  children,
}) {
  const [responseMessege, setResponseMessege] = useState("");
  const darkness = dark
    ? "text-background-base bg-white"
    : "bg-background-base text-bodytxt-base/90";
  const shadow = dark
    ? "shadow-[-0.3px_-0.4px_0.2rem_rgba(0,0,0,0.2),0.3px_0.4px_0.2rem_rgba(0,0,0,0.2)]"
    : "shadow-md";
  const [inputData, setInputData] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // const emailRgx = /^[a-z-._0-9]+@[a-z0-9]+\.[a-z]{2,5}$/;
    // if (emailRgx.test(inputData)) {
    //   setResponseMessege(successMessage);
    //   setTimeout(() => {
    //     setResponseMessege("");
    //   }, 5000);
    // } else {
    //   setResponseMessege(errorMessege);
    // }
    const randomId = generateRandomId();
    try {
      setDoc(doc(database, "contact list", `${randomId}`), {
        email: inputData,
      }).then(() => {
        alert("send email successfully");
        setInputData("");
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setInputData(value);
  };
  console.log(inputData);
  return (
    <form
      className={`relative w-full md:max-w-xl max-w-md h-full xl:h-14 flex gap-3 md:gap-5 items-center lg:items-start  ${
        vertical && "flex-col md:flex-row"
      }`}
      onSubmit={handleSubmit}
    >
      <div className="w-full h-full flex relative ">
        <input
          type="text"
          name="email"
          value={inputData}
          onChange={handleChange}
          placeholder={"Enter your Email"}
          className={`${darkness} w-full text-sm px-4 xl:px-12 py-3 block rounded-md ${shadow} `}
        />
      </div>

      <small className="text-primary-base absolute w-full top-[-1.5rem] text-[.78rem] text-start">
        {responseMessege}
      </small>

      {/* Submit Button */}
      {children}
    </form>
  );
}
