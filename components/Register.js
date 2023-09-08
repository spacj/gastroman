import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { errorToast, successToast, warnToast } from "./Toast";
import { auth, database } from "@/firebaseconfig";
import { checkout } from "@/stripe";
import { Logo } from "../components/Logo";

const Register = ({ priceId }) => {
  // const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [firstName, setFName] = useState("");
  const [lastName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    if (!firstName && !lastName && !email && !password)
      return warnToast("Please Enter Your Name , Email and Password");
    if (!firstName) return warnToast("Please Enter a Name");
    if (!email) return warnToast("Please Enter a Email");
    if (!password) return warnToast("Please Enter a Password");

    createUserWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        if (!userCredential?.user?.uid) return;
        setDoc(doc(database, "store users", `${userCredential?.user?.uid}`), {
          user_id: userCredential?.user?.uid,
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          price:
            priceId === "101"
              ? "$750"
              : priceId === "201"
              ? "$1300"
              : priceId === "100"
              ? "$17.99/month"
              : "$28.99/month",
        })
          .then(() => {
            setFName("");
            setLName("");
            setEmail("");
            setPassword("");
            console.log("store successfully");
          })
          .catch((error) => {
            errorToast(error);
          });
      }
    );

    try {
      checkout({
        lineItems: [
          {
            price:
              priceId === "101"
                ? "price_1Nn6WlBXxWEGT2PfYrD1EodS"
                : priceId === "201"
                ? "price_1Nn6XrBXxWEGT2PfOQ9WR34e"
                : priceId === "100"
                ? "price_1Nn61OBXxWEGT2Pf6STH93PR"
                : "price_1Nn6UdBXxWEGT2Pfe5lkSfu1",

            quantity: 1,
          },
        ],
        mode:
          priceId === "101"
            ? "payment"
            : priceId === "201"
            ? "payment"
            : priceId === "100"
            ? "subscription"
            : "subscription",
      });
    } catch (err) {
      console.log("err", err);
    }

    return successToast("Register Successful");
  };

  return (
    <div
      className="flex min-h-screen flex-col items-start pr-24 pb-[15vh] bg-sky-300"
      style={{ height: "100vh" }}
    >
      <div className="pl-[10vw] pt-[5vh]">
        <Logo classname="flex justify-start w-[100vw] max-h-[20vh]" />
      </div>

      <div
        className="flex justify-center items-center w-[100vw] pt-[4vh]"
        style={{ height: "100vh" }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-4xl text-white drop-shadow-2xl font-titlee">
              REGISTER NOW
            </h3>
            <h5 className="text-white font-titlee drop-shadow-xl pb-[5vh]">
              Create an account and start now{" "}
            </h5>
          </div>
          <div className="flex flex-col gap-4 ">
            <input
              type="text"
              placeholder="Enter your first name"
              className="input input-bordered w-full max-w-xs"
              value={firstName}
              onChange={(e) => setFName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your last name"
              className="input input-bordered w-full max-w-xs"
              value={lastName}
              onChange={(e) => setLName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered w-full max-w-xs"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your password"
              className="input input-bordered w-full max-w-xs"
              value={
                priceId === "101"
                  ? "$750"
                  : priceId === "201"
                  ? "$1300"
                  : priceId === "100"
                  ? "$17.99/month"
                  : "$28.99/month"
              }
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <br />
          <div>
            <button
              className="btn btn-primary bg-blue-700 border-white text-white hover:border-blue-700 hover:bg-transparent hover:text-blue-700 cursor-pointer "
              onClick={handleRegister}
            >
              BUY NOW
            </button>
          </div>
          <p onClick={() => router.push("/login")}>
            Already have an account? <b className="cursor-pointer">LOGIN</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
