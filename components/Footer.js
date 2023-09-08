import { Logo } from "./Logo";
import logo from "../public/images/logo.png";

import React from "react";
import { ContactForm } from "./ContactForm";
import { ButtonPrimary } from "./ButtonPrimary";

function Footer() {
  return (
    <footer className="container bg-sky-300 gap-y-16 lg:gap-y-20 pt-12 xl:pt-28">
      <div className="col-start-2 col-span-10 3xl:col-start-3 3xl:col-span-8">
        <div className="flex flex-col gap-10 lg:gap-20 items-center">
          {/* Intro */}
          <div className="flex flex-col gap-2 items-center">
            <h3 className="text-white text-xl sm:text-2xl md:text-3xl xl:text-4xl  text-center font-bold">
              Still any doubt?
            </h3>
            <p className="text-white text-center font-extralight text-xs xl:text-lg leading-7 lg:max-w-md">
              Get contact to find together the best solution for your business
            </p>
          </div>

          {/* Contact Form */}
          <div className="w-full h-full flex justify-center">
            <ContactForm
              successMessage={"Thanks you"}
              errorMessege={"Please enter a valid email address"}
              vertical
              dark
            >
              <div className={`h-full w-full md:w-fit`}>
                <ButtonPrimary
                  className={
                    "text-white sm:text-base border-2 hover:border-white border-transparent hover:bg-transparent shadow-none transition-all duration-700"
                  }
                >
                  Contact me
                </ButtonPrimary>
              </div>
            </ContactForm>
          </div>
        </div>
      </div>

      {/* Nav */}
      <div className="col-span-12 container bg-sky-200 py-8 ">
        <div className="col-start-2 col-span-10 3xl:col-start-3 3xl:col-span-8">
          <div className="flex flex-col lg:flex-row gap-7 lg:gap-0 items-center lg:justify-between">
            <div className="flex flex-col lg:flex-row gap-7 lg:gap-1 items-center">
              <Logo white />

              {/* CopyRights */}
              <h4 className="text-base text-[9px] text-white sm:drop-shadow-2xl xl:text-[14px] text-center lg:text-start">
                &copy; Copyright {new Date().getFullYear()} GUI Design by{" "}
                <a href="https://startuplanding.redq.io/">
                  GatroWeb.com Digital Solutions
                </a>{" "}
                <br />
                <span className="block md:inline">
                  {" "}
                  Provided by<a href="#"> Malek</a>
                </span>
              </h4>
            </div>

            <ul className="flex">
              <li className="pl-2">
                <a
                  href="#home"
                  className="active capitalize sm:text-blue-700 sm:font-bold hover:text-blue-600 text-xs md:text-base font-medium hover:font-bold lg:px-2 xl:px-4 "
                >
                  home
                </a>
              </li>
              <li className="pl-2">
                <a
                  href="#features"
                  className="capitalize sm:text-blue-700 sm:font-bold hover:text-blue-600 text-xs md:text-base font-medium hover:font-bold lg:px-2 xl:px-4 "
                >
                  features
                </a>
              </li>
              <li className="pl-2">
                <a
                  href="#pricing"
                  className="capitalize sm:text-blue-700 sm:font-bold hover:text-blue-600 text-xs md:text-base font-medium hover:font-bold lg:px-2 xl:px-4 "
                >
                  pricing
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* </div> */}
    </footer>
  );
}

export default Footer;
