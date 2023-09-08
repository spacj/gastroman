import React, { useState } from "react";
import { ButtonPrimary } from "./ButtonPrimary";
import Link from "next/link";

export default function Pricing({ pricing }) {
  const [pricePlan, setPricePlan] = useState(pricing.monthly);
  const [activePlan, setActivePlan] = useState("monthly");
  const [hovred, setHovred] = useState(false);

  function toggleActiveCard(card, idx) {
    idx === 1 && card.classList.toggle("flip-left");
    idx === 0 && card.classList.toggle("flip-right");
    card.classList.toggle("active");
  }

  function togglePricingPlan(e) {
    const elements = document.querySelectorAll(`.custom-card-effects`);
    elements.forEach((card, idx) => {
      toggleActiveCard(card, idx);
    });

    setTimeout(() => {
      if (e.target.value === "monthly") {
        setActivePlan("annual");
        setPricePlan(pricing.annual);
      } else if (e.target.value === "annual") {
        setActivePlan("monthly");
        setPricePlan(pricing.monthly);
      }
    }, 150);
  }

  function handleCardClick(e) {
    const cardConatier = [...e.currentTarget.parentElement.children];
    cardConatier.forEach((card, idx) => {
      toggleActiveCard(card, idx);
    });
  }
  return (
    <section
      data-section="pricing"
      className="col-span-12 container h-full py-12 xl:pb-20 bg-background-secondary "
    >
      <div className="col-span-12 md:col-start-2 md:col-span-10 3xl:col-start-3 3xl:col-span-8 flex flex-col gap-8 md:gap-14 overflow-hidden items-center justify-center">
        <div className="flex flex-col items-center gap-20 xl:gap-28 px-4 py-24">
          {/** Intro **/}
          <div className="flex flex-col gap-10 items-center">
            <div className="flex flex-col gap-3">
              <h3 className="text-xl sm:text-2xl md:text-3xl xl:text-4xl text-heading-base text-center font-bold">
                Choose the best deal for you
              </h3>

              <p className="text-heading-base/80 text-center font-light leading-7 text-xs  lg:text-lg max-w-md md:max-w-lg">
                Toggle your preference
              </p>
            </div>

            {/* Toggle */}
            <div className="flex items-center gap-5">
              <span className="text-heading-base xl:text-lg font-medium">
                Monthly
              </span>
              <button className="p-[3px] xl:p-[4px] w-fit h-fit bg-blue-700 rounded-full pointer-events-auto">
                <input
                  type={"checkbox"}
                  value={activePlan}
                  id="toggle-checlbox"
                  onClick={togglePricingPlan}
                  className={
                    "min-w-full min-h-full bg-blue-700 cursor-pointer relative w-16 h-8 block appearance-none rounded-full checked:before:translate-x-full before:transition-transform before:duration-500  before:absolute before:w-1/2 before:h-full before:bg-white before:rounded-full before:shadow-md before:shadow-neutral-500 "
                  }
                />
                <label htmlFor="toggle-checlbox" className="sr-only">
                  toggle pricing card from monthly to annual
                </label>
              </button>
              <span className="text-heading-base xl:text-lg font-medium">
                One-Shot
              </span>
            </div>
            {/* Toggle End */}
          </div>
          {/* Intro End */}

          {/** Pricing Cards **/}
          <div className="flex flex-col lg:flex-row gap-8 md:gap-16 lg:gap-0 items-center transition-all duration-700">
            {pricePlan.map((plan, idx, array) => {
              return (
                // Card
                <div
                  key={plan.packName}
                  className={`
                  custom-card-effects flip max-w-[420px] xl:max-w-[500px] py-10 md:py-16 px-6 md:px-10 bg-background-base rounded-md shadow-xl lg:shadow-md flex flex-col gap-6 md:gap-8 lg:[&.active]:shadow-2xl  ${
                    idx === 1 && "active"
                  }  `}
                  onMouseEnter={(e) => hovred && handleCardClick(e)}
                  onMouseOver={(e) =>
                    window.innerWidth > 1024 && setHovred(true)
                  }
                  onMouseLeave={(e) => setHovred(false)}
                >
                  {/* Card intro */}
                  <div className="flex flex-col gap-2 border-b-2 pb-6 ">
                    <h3 className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-heading-base font-semibold">
                      {plan.packName}
                    </h3>
                    <h3 className="text-lg sm:text-xl md:text-2xl xl:text-3xl text-blue-700 font-semibold">
                      {plan.price}
                    </h3>
                    <p className="text-heading-base/80  font-light leading-5 text-xs  lg:text-base tracking-tight max-w-md md:max-w-lg">
                      {plan.audience}
                    </p>
                  </div>

                  {/* Card benefit */}
                  <ul className="flex flex-col gap-4 border-b-2 pb-6">
                    {plan.benefits.map((benefit, idx) => {
                      return (
                        <li
                          key={idx}
                          className="text-heading-base/80 font-medium leading-5 text-xs  lg:text-lg max-w-md md:max-w-lg flex item"
                        >
                          {benefit.available ? (
                            <img
                              className="max-h-5 w-5 relative top-1 fill-white "
                              src="../images/icons/available.svg"
                              alt="check success icon"
                            />
                          ) : (
                            <img
                              className="max-h-5 w-5 relative top-1 fill-white "
                              src="../images/icons/unavailable.svg"
                              alt="check success icon"
                            />
                          )}

                          <span className="inline-block pl-2 md:pl-4">
                            {benefit.name}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  {/* Card Btn */}
                  <Link href={`/register/${plan.id}`}>
                    <div className="w-full lg:w-fit h-fit">
                      <ButtonPrimary
                        className={
                          "lg:py-7 text-white hover:text-blue-700 hover:bg-white hover:border-blue-700 border-2 border-transparent transition-all duration-500"
                        }
                      >
                        Start Now
                      </ButtonPrimary>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          {/* Pricing Cards End*/}
        </div>
      </div>
    </section>
  );
}
