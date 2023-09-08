import { database, logOut, useAuth } from "@/firebaseconfig";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { successToast } from "./Toast";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { userAtom } from "@/atom/global.atom";
import { useRecoilState } from "recoil";
import { useScroll } from "framer-motion";
import { useEffect, useState } from "react";

function SideBar2() {
  const [userInfo, setUserInfo] = useRecoilState(userAtom);
  const [service, setService] = useState(0);
  const router = useRouter();
  const onSignOutHandler = () => {
    logOut();
    deleteCookie("logged");
    successToast("Sign Out Successfully");
    router.push("/");
  };
  const currentUser = useAuth();

  const getUserData = async (currentUserId) => {
    await getDocs(collection(database, "store users")).then((querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => doc.data());
      const currUser = data?.filter((user) => user?.user_id === currentUserId);
      console.log(currUser);
      if (currUser[0]?.price === "$750") {
        setService(1);
      } else if (currUser[0]?.price === "$1300") {
        setService(2);
      } else if (currUser[0]?.price === "$28.99/month") {
        setService(3);
      }
      setUserInfo(currUser[0]);
    });
  };

  console.log(service);

  useEffect(() => {
    console.log(currentUser, userInfo);
    if (userInfo) return;
    if (!currentUser?.uid) return;
    getUserData(currentUser.uid);
  }, [currentUser?.uid]);

  return (
    <div>
      <div className="pt-0 pr-0 pb-0 pl-0 mt-0 mr-0 mb-0 ml-0"></div>
      <div className="bg-white"></div>
      <div className="bg-white">
        <div className="flex-col flex">
          <div className="w-full border-b-2 border-gray-200"></div>
          <div className="flex bg-gray-100  overflow-x-hidden">
            <div className="bg-white lg:flex md:w-64 md:flex-col">
              <div className="flex-col pt-5 flex overflow-y-auto">
                <div className="h-full flex-col justify-between px-4 flex">
                  <div className="space-y-4">
                    <div className="bg-top bg-cover space-y-1">
                      <div
                        className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                      >
                        <span className="justify-center items-center flex">
                          <span className="justify-center items-center flex">
                            <span className="justify-center items-center flex">
                              <span className="items-center justify-center flex">
                                <svg
                                  className="flex-shrink-0 w-5 h-5 mr-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewbox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1
                              1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                  />
                                </svg>
                              </span>
                            </span>
                          </span>
                        </span>
                        <span>Dashboard</span>
                      </div>
                    </div>
                    <div>
                      <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                        Manage Account Info
                      </p>
                      <Link href="/infoPersonal">
                        <div className="mt-4 bg-top bg-cover space-y-1">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0
                                002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0
                                012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Personal Info</span>
                          </div>
                        </div>
                      </Link>
                    </div>
                    {service === 0 && (
                      <div>
                        <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                          Menu
                        </p>
                        <div className="mt-4 bg-top bg-cover space-y-1">
                          <Link href="/infoBusiness">
                            <div
                              className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                            >
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="justify-center items-center flex">
                                    <span className="items-center justify-center flex">
                                      <svg
                                        className="flex-shrink-0 w-5 h-5 mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewbox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0
                                002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0
                                012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                      />
                                    </span>
                                  </span>
                                </span>
                              </span>
                              <span>Your Business</span>
                            </div>
                          </Link>
                          <Link href="/menu">
                            <div
                              className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                            >
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="justify-center items-center flex">
                                    <span className="items-center justify-center flex">
                                      <svg
                                        className="flex-shrink-0 w-5 h-5 mr-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewbox="0 0 24 24"
                                        stroke="currentColor"
                                        stroke-width="2"
                                      />
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                      />
                                    </span>
                                  </span>
                                </span>
                              </span>
                              <span>Menu Generator</span>
                            </div>
                          </Link>
                          <a
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Languages</span>
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                  {service === 1 && (
                    <div className="mt-4 pb-4">
                      <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                        Single Page
                      </p>
                      <div className="bg-top bg-cover space-y-1">
                        <Link href="/infoBusiness">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0
                                002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0
                                012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Your Business</span>
                          </div>
                        </Link>

                        <Link href="/menu">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-Yourcenter flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Menu Generator</span>
                          </div>
                        </Link>

                        <Link href="/about">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>About us</span>
                          </div>
                        </Link>

                        <Link href="/mission">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Mission</span>
                          </div>
                        </Link>

                        <Link href="/moreinfo">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>More Info</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                  {service === 2 && (
                    <div className="mt-4 pb-4">
                      <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                        Multiple Page
                      </p>
                      <div className="bg-top bg-cover space-y-1">
                        <Link href="/infoBusiness">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0
                                002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0
                                012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Your Business</span>
                          </div>
                        </Link>

                        <Link href="/menu">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Menu Generator</span>
                          </div>
                        </Link>

                        <Link href="/about">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>About us</span>
                          </div>
                        </Link>

                        <Link href="/mission">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Mission</span>
                          </div>
                        </Link>

                        <Link href="/reserve">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0
                                002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0
                                012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Menu Reservation Tool</span>
                          </div>
                        </Link>
                        <Link href="/moreinfos">
                          <div
                            className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                          >
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="justify-center items-center flex">
                                  <span className="items-center justify-center flex">
                                    <svg
                                      className="flex-shrink-0 w-5 h-5 mr-4"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewbox="0 0 24 24"
                                      stroke="currentColor"
                                      stroke-width="2"
                                    />
                                    <path
                                      stroke-linecap="round"
                                      stroke-linejoin="round"
                                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                  </span>
                                </span>
                              </span>
                            </span>
                            <span>Unlimited more info</span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className="mt-4 pb-4">
                    <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                      app
                    </p>
                    <div className="bg-top bg-cover space-y-1">
                      <Link href="/idea">
                        <div
                          className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                      transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                        >
                          <span className="justify-center items-center flex">
                            <span className="justify-center items-center flex">
                              <span className="justify-center items-center flex">
                                <span className="items-center justify-center flex">
                                  <svg
                                    className="flex-shrink-0 w-5 h-5 mr-4"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewbox="0 0 24 24"
                                    stroke="currentColor"
                                    stroke-width="2"
                                  />
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0
                                0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                  />
                                </span>
                              </span>
                            </span>
                          </span>
                          <span>Summarize your idea</span>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="mt-4 pb-4">
                    <p className="px-4 font-semibold text-xs tracking-widest text-gray-400 uppercase">
                      Buttons
                    </p>
                    <div className="bg-top bg-cover space-y-1">
                      <a
                        href="#"
                        className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                      >
                        <span className="justify-center items-center flex">
                          <span className="justify-center items-center flex">
                            <span className="justify-center items-center flex">
                              <span className="items-center justify-center flex">
                                <svg
                                  className="flex-shrink-0 w-5 h-5 mr-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewbox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0
                              002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756
                              2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0
                              00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0
                              00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0
                              00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0
                              001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016
                              0z"
                                />
                              </span>
                            </span>
                          </span>
                        </span>
                        <span>Generate Website</span>
                      </a>
                      <a
                        href="#"
                        className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                      >
                        <span className="justify-center items-center flex">
                          <span className="justify-center items-center flex">
                            <span className="justify-center items-center flex">
                              <span className="items-center justify-center flex">
                                <svg
                                  className="flex-shrink-0 w-5 h-5 mr-4"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewbox="0 0 24 24"
                                  stroke="currentColor"
                                  stroke-width="2"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0
                              002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756
                              2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0
                              00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0
                              00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0
                              00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0
                              001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                />
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016
                              0z"
                                />
                              </span>
                            </span>
                          </span>
                        </span>
                        <span>Invite a friend</span>
                      </a>
                      <div
                        onClick={onSignOutHandler}
                        className="font-medium text-sm items-center rounded-lg text-gray-900 px-4 py-2.5 flex
                    transition-all duration-200 hover:bg-gray-200 group cursor-pointer"
                      >
                        <span className="justify-center items-center flex">
                          <span className="justify-center items-center flex">
                            <span className="justify-center items-center flex">
                              <span className="items-center justify-center flex">
                                <svg
                                  className="mr-4"
                                  width="24"
                                  height="24"
                                  viewbox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                />
                                <path
                                  d="M8 18.9282C9.21615 19.6303 10.5957 20 12
                              20C13.4043 20 14.7838 19.6303 16 18.9282C17.2162 18.2261 18.2261 17.2162 18.9282
                              16C19.6303 14.7838 20 13.4043 20 12C20 10.5957 19.6303 9.21615 18.9282 8C18.2261 6.78385
                              17.2162 5.77394 16 5.0718C14.7838 4.36965 13.4043 4 12 4C10.5957 4 9.21615 4.36965 8
                              5.0718"
                                  stroke="#4F4F4F"
                                  stroke-width="2"
                                />
                                <path
                                  d="M2 12L1.21913 11.3753L0.719375
                              12L1.21913 12.6247L2 12ZM11 13C11.5523 13 12 12.5523 12 12C12 11.4477 11.5523 11 11
                              11V13ZM5.21913 6.3753L1.21913 11.3753L2.78087 12.6247L6.78087 7.6247L5.21913
                              6.3753ZM1.21913 12.6247L5.21913 17.6247L6.78087 16.3753L2.78087 11.3753L1.21913 12.6247ZM2
                              13H11V11H2V13Z"
                                  fill="#4F4F4F"
                                />
                              </span>
                            </span>
                          </span>
                        </span>
                        <span>Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar2;
