import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { setCookie } from "cookies-next";
import { auth, database } from "@/firebaseconfig";
import { errorToast, successToast, warnToast } from "./Toast";
import { useRecoilSnapshot, useRecoilState } from "recoil";
import { userAtom } from "@/atom/global.atom";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const LoginPage = () => {
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const getUserData = async (currentUserId) => {
    await getDocs(collection(database, "store users")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      const currUser = data?.filter((user) => user?.user_id === currentUserId);
      setUserInfo(currUser[0]);
    });
  };

  const getPaymentData = async (userCredential) => {
    const docRef = doc(
      database,
      "payment",
      userCredential?.user.uid.toString()
    );
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data.session_id) {
        router.push("/infoPersonal");
        successToast("Login Successful");
      } else {
        errorToast("No User Found");
      }
    } else {
      errorToast("No document Found");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email && !password)
      return warnToast("Please Enter a Valid Email and Password");
    if (!email) return warnToast("Please Enter a Email");
    if (!password) return warnToast("Please Enter a Password");

    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        getUserData(userCredential?.user?.uid);
        if (userCredential?.user?.email === "anupamroy575@gmail.com") {
          router.push("/admin/dashboard");
          successToast("Login Successful");
        } else {
          getPaymentData(userCredential);
        }
        setCookie("logged", "true");
      })
      .catch((error) => {
        errorToast("No User Found");
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="flex flex-col gap-4 max-w-[80vw] align-center">
          <div>
            <h3 className="font-bold text-2xl text-white drop-shadow-2xl font-titlee">
              Welcome back!
            </h3>
          </div>
          <form onSubmit={handleLogin} className="flex flex-col gap-4 pt-[4vh]">
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
            <button
              type="submit"
              className="btn btn-primary w-100 cursor-pointer bg-blue-700 border-white text-white hover:bg-transparent hover:text-blue-700 hover:border-blue-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
      <div className="mt-4">
        <p onClick={() => router.push("/#pricing")} className="cursor-pointer pt-[4vh]">
          Don't have an account yet? <b>START NOW!</b>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
