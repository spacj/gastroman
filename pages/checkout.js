import { errorToast, successToast } from "@/components/Toast";
import { database, useAuth } from "@/firebaseconfig";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import React from "react";

const Checkout = () => {
    const router = useRouter();
    const currentUser = useAuth();
    const handleComplete = () => {
        if (!currentUser?.uid) return;
      setDoc(doc(database, "payment", `${currentUser?.uid}`), {
            session_id: router.query.session_id
        })
          .then(() => {
            successToast("Payment Successful")
              console.log("store successfully");
              router.push('/login')
          })
          .catch((error) => {
            errorToast(error);
          });
        
  };
  return (
    <div className="flex flex-col items-center gap-10 justify-center h-screen">
          <div className="text-2xl font-bold">Thanks For Your payment</div>
          <div className="text-2xl font-bold">Click button for complete </div>
      <button
        className="btn btn-primary cursor-pointer"
        onClick={handleComplete}
      >
        Done
      </button>
    </div>
  );
};

export default Checkout;
