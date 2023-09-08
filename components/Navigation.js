import React, { useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Link from "next/link";

function Navigation() {
  const logoRef = useRef();
  const navRef = useRef();
  const navList = useRef();
  const menuBtnRef = useRef();
  const overlayRef = useRef();
  const headerRef = useRef();
  const [viewWidth, setviewportWidth] = useState(null);
  const [scrollLength, setsScrollLength] = useState(null);
  const handleResize = () => setviewportWidth(window.innerWidth);
  const handleScroll = () => setsScrollLength(window.scrollY);
  const handleHeaderOnScroll = onScrollHandler(headerRef);

  const router = useRouter();
  const toggleMenu = menuClickHandler(
    menuBtnRef,
    navRef,
    logoRef,
    overlayRef,
    "active"
  );

  // reset menu for large screen if it was active
  if (viewWidth > 1024 && navRef.current.classList.contains("active")) {
    toggleMenu();
  }
  useEffect(() => {
    handleHeaderOnScroll(scrollLength);
    window.addEventListener("resize", handleResize, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", handleResize, { passive: true });
      window.removeEventListener("scroll", handleScroll, { passive: true });
    };
  }, [handleResize, handleScroll]);

  useEffect(() => {
    // Observing sections to change active layout on scroll
    const observer = new IntersectionObserver(
      (entries, observer) => {
        function toggleActiveSection(entry, sectionRect) {
          const intersectingAtrr = entry.target.getAttribute("data-section");
          const links = document.querySelectorAll(
            `a[href="#${intersectingAtrr}"]`
          );

          links.forEach((link) => {
            // toggle in/out view active
            if (!entry.isIntersecting) {
              link.classList.remove("active");
            } else {
              link.classList.add("active");
            }

            // move to the section realted to the clicked link
            link.addEventListener("click", () => {
              entry.target.scrollIntoView({
                block: "center",
                behavior: "smooth",
              });
            });
          });
        }

        entries.forEach((entry, idx) => {
          toggleActiveSection(entry, entry.boundingClientRect);
        });
      },
      { threshold: [0.35] }
    );

    [...navList.current.children].forEach((item) => {
      const sectionAtrr = item.firstElementChild.getAttribute("href").slice(1);
      const section = document.querySelectorAll(
        `section[data-section="${sectionAtrr}"]`
      );
      section.forEach((sec) => observer.observe(sec));
    });
  }, []);
  // Animations
  const navListVariant = {
    offscreen: {},
    onscreen: {
      transition: {
        type: "spring",
        bounce: 0.15,
        staggerChildren: 0.09,
      },
    },
  };
  const ItemVariant = {
    offscreen: {
      opacity: 0,
      y: "20%",
    },

    onscreen: {
      opacity: 1,
      y: "0%",
    },
  };
  const button = {
    offscreen: {
      scaleX: 0.77,
      opacity: 0,
    },
    onscreen: {
      scaleX: 1,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.2,
        duration: 0.45,
        delay: 0.25,
      },
    },
  };
  return (
    <header
      ref={headerRef}
      className="header container fixed [&.scrolled-down]:bg-background-base
    [&.scrolled-down]:shadow-md transition-all duration-[0.84s] z-30"
    >
      <div className="col-start-2 col-span-10 3xl:col-start-3 3xl:col-span-8 py-4 xl:py-8 flex justify-between items-center [&.scrolled-down]:py-1.5 [&.scrolled-down]:xl:py-3.5 transition-all duration-[0.84s]">
        {/* header Buttons */}
        <div className="flex gap-6 xl:gap-12 items-center justify-center order-6">
          <motion.button
            /*  disabled */
            className=" py-3 text-heading-base capitalize font-medium flex items-center justify-center gap-3"
            variants={button}
            initial="offscreen"
            animate="onscreen"
          >
            <img
              className="object-cover w-35 h-45 sm:invisible"
              src={"../images/icons/lock.png"}
              alt={"logo img"}
            />
            <span
              className="block cursor-pointer font-titlee text-neutral-500"
              onClick={() => router.push("/login")}
            >
              LOGIN
            </span>
          </motion.button>
          <a href="#pricing">
            <motion.button
              className="hidden lg:inline-block bg-blue-700 font-titlee text-slate-200 px-4 py-2 rounded-md capitalize font-semibold border-2 border-transparent hover:bg-primary-base/0 hover:border-blue-700 hover:text-blue-700 transition-all duration-500"
              variants={button}
              initial="offscreen"
              animate="onscreen"
            >
              START NOW!
            </motion.button>
          </a>

          {/* Menu Button */}
          <div className="lg:hidden flex items-center z-40">
            <button
              className="custom-hamburger-menu w-[24px] h-[18px] flex gap-[4.5px]"
              onClick={toggleMenu}
              ref={menuBtnRef}
              type="button"
              aria-controls="nav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="bg-slate-500 block w-6 h-[2.9px]" />
              <span className="bg-slate-500 block w-6 h-[2.9px]" />
              <span className="bg-slate-500 block w-6 h-[2.9px]" />
            </button>
          </div>
        </div>

        <Logo />

        {/* OverLay on menu active*/}
        <div
          ref={overlayRef}
          className="lg:hidden w-screen absolute left-0 top-0 [&.active]:h-screen transition-colors duration-700 [&.active]:bg-black/50"
        />

        {/* Navigation items*/}
        <nav
          id="nav"
          ref={navRef}
          className="nav h-screen absolute top-0 right-0 min-w-[70%] max-w-xs transition-all duration-1000 translate-x-[140%] [&.active]:block [&.active]:bg-white [&.active]:translate-x-[0%] z-20 pt-28 lg:min-w-fit lg:static lg:h-fit lg:w-fit lg:p-0 lg:translate-x-0 "
        >
          <motion.div ref={logoRef} className={"w-fit h-fit"}>
            <Logo
              Wrapperclasses={
                "lg:hidden w-32 h-fit flex items-center absolute top-15 left-8 md:left-16 transition-opacity duration-[3.5s] opacity-0 [&.active]:opacity-100 xl:w-fit"
              }
            />
          </motion.div>

          <motion.ul
            ref={navList}
            className="pl-8 md:pl-16 lg:pl-0 flex flex-col lg:flex-row"
            variants={navListVariant}
            initial="offscreen"
            animate="onscreen"
          >
            <motion.li
              className="border-y-[.12rem] border-neutral-200 hover:bg-primary-base/[0.03 lg:py-0 lg:border-none"
              variants={ItemVariant}
            >
              <a
                href="#home"
                className="capitalize block py-3 text-bodytxt-secondary/60 font-titlee font-medium hover:font-bold hover:text-blue-700 [&.active]:text-blue-700 [&.active]:font-bold lg:px-2 2xl:px-6 lg:text-neutral-500 "
              >
                HOME
              </a>
            </motion.li>
            <motion.li
              className="border-b-[.12rem] border-neutral-200 hover:bg-primary-base/[0.03] lg:py-0 lg:border-none"
              variants={ItemVariant}
            >
              <a
                href="#features"
                className="capitalize block py-3 text-bodytxt-secondary/60 font-titlee font-medium hover:font-bold hover:text-blue-700 [&.active]:text-blue-700 lg:px-2 2xl:px-6 lg:text-neutral-500 "
              >
                FEATURES
              </a>
            </motion.li>
            <motion.li
              className="border-b-[.12rem] border-neutral-200 hover:bg-primary-base/[0.03] lg:py-0 lg:border-none"
              variants={ItemVariant}
            >
              <a
                href="#products"
                className="capitalize block py-3 text-bodytxt-secondary/60 font-titlee font-medium hover:font-bold hover:text-blue-700 [&.active]:text-blue-700 lg:px-2 2xl:px-6 lg:text-neutral-500 "
              >
                PRODUCTS
              </a>
            </motion.li>
            <motion.li
              className="border-b-[.12rem] border-neutral-200 hover:bg-primary-base/[0.03] lg:py-0 lg:border-none"
              variants={ItemVariant}
            >
              <a
                href="#pricing"
                className="capitalize block py-3 text-bodytxt-secondary/60 font-titlee font-medium hover:font-bold hover:text-blue-700 [&.active]:text-blue-700 lg:px-2 2xl:px-6 lg:text-neutral-500 "
              >
                PRICING
              </a>
            </motion.li>
          </motion.ul>
        </nav>
      </div>
    </header>
  );
}

export default Navigation;

function onScrollHandler(headerRef) {
  return (length) => {
    if (length < 55 || length === 0) {
      headerRef.current.classList.remove("scrolled-down");
      headerRef.current.firstElementChild.classList.remove("scrolled-down");
    } else {
      headerRef.current.classList.add("scrolled-down");
      headerRef.current.firstElementChild.classList.add("scrolled-down");
    }
  };
}

function menuClickHandler(
  menuButton,
  menuRef,
  logoRef,
  overlayRef,
  activeClass
) {
  return () => {
    menuButton.current.ariaExpanded =
      menuButton.current.ariaExpanded === "false" ? "true" : "false";

    menuButton.current.classList.toggle(activeClass);
    logoRef.current.firstElementChild.classList.toggle(activeClass);
    menuRef.current.classList.toggle(activeClass);
    overlayRef.current.classList.toggle(activeClass);
  };
}
