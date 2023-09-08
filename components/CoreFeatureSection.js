import React from "react";

const data = [
  "'Single Page Website' features included",
  "Free Logo design",
  "6 + languages",
  "1 to 7 pages",
  "Online Reservation Tool",
  "Ready in just 10 working days",
];
export default function CoreFeatureSection({ accordionData }) {
  return (
    <>
      <section
        data-section="features"
        className="col-span-12 container h-full py-10 xl:pb-28"
      >
        <div className="col-start-2 col-span-10 3xl:col-start-3 3xl:col-span-8  flex flex-col gap-4 lg:flex-row lg:justify-between lg:gap-0">
          {/* Feature image */}
          <h2 className="text-xl md:hidden sm:text-2xl md:text-3xl xl:text-4xl text-heading-base font-bold text-start md:text-center lg:text-start">
            <span className="md:block lg:inline">
              Website and App development
            </span>
            <span> for small business</span>
          </h2>
          <figure className="place-self-center xl:w-full">
            <img
              className="object-fit"
              src={"../images/appuno.png"}
              width={750}
              height={850}
              layout="intrinsic"
              alt="premium feature"
            />
          </figure>
          {/* Feature description */}
          <div className="flex flex-col gap-8 lg:w-[65%] 2xl:w-[75%]">
            {/* Intro */}
            <div className="flex flex-col gap-4 md:items-center lg:items-start">
              <h2 className="text-xl hidden md:block sm:text-2xl md:text-3xl xl:text-4xl text-heading-base font-bold text-start md:text-center lg:text-start">
                <span className="md:block lg:inline">
                  Website and App development
                </span>
                <span> for small businesses</span>
              </h2>

              <p className="text-heading-base text-start md:text-center lg:text-start font-light leading-7 md:text-lg max-w-md md:max-w-lg ">
                Fast, easy and guided steps to enjoy the gatronomy innovation in
                few days. <br /> Captivate customers, streamline operations, and
                amplify profits – your digital advantage starts here.
              </p>
            </div>
            {/* Intro End  */}

            {/* Accordion  */}
            <div className="flex flex-col gap-4  xl-gap-6">
              {accordionData.map(({ heading, desc }) => (
                <Accordion key={heading} heading={heading} description={desc} />
              ))}
            </div>
            {/* Accordion End*/}
          </div>
          {/* Feature description End */}
        </div>
      </section>

      <section
        data-section="products"
        className="col-span-12 container h-full py-10 xl:pb-28"
      >
        <div className="col-start-2 col-span-10 lg:col-start-2 lg:col-span-10 3xl:col-start-3 3xl:col-span-8  flex flex-col gap-4 lg:flex-row-reverse lg:justify-between xl:gap-0">
          {/* Feature image */}
          <h2 className="text-2xl md:hidden md:text-4xl text-heading-base font-semibold md:font-bold text-center md:text-center lg:text-start">
            <span className="md:block ">Menù and QR code</span>
          </h2>
          <figure className="block lg:flex-1 aspect-h-4 aspect-w-3 lg:aspect-h-2 lg:aspect-w-3">
            <img
              className="object-contain"
              src="../images/menuage.png"
              alt="agency app image"
            />
          </figure>

          {/* Feature description */}
          <div className="flex flex-col gap-8 md:gap-12 lg:w-[55%]  lg:pt-24 2xl:pt-12 2xl:flex-1 ">
            {/* Intro */}
            <div className="flex flex-col gap-5 md:items-center lg:items-start">
              <h2 className="text-2xl hidden md:block md:text-4xl text-heading-base font-semibold md:font-bold text-center md:text-center lg:text-start">
                <span className="md:block ">Menù and QR code</span>
              </h2>

              <p className="text-heading-base text-center md:text-center lg:text-start font-light leading-7 md:text-lg max-w-md md:max-w-lg">
                Show your products with a fully customized menù and improve the
                customer experience with accessible QR codes
              </p>
            </div>
            {/* Intro End  */}

            {/* feature list */}
            <div className="flex flex-col gap-5 text-sm md:text-base md:items-start md:gap-7 md:justify-center">
              <div className="flex flex-col gap-3 md:gap-20 sm:pl-[5vw] lg:pl-0">
                <ul className="flex flex-col gap-3">
                  <li className="indent-38">
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg">
                      {" "}
                      Create categories (dishes, drinks...)
                    </span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg"> Choose the style</span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg"> Upload pictures</span>
                  </li>

                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg"> 100% Mobile Responsive</span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg"> QR code generator</span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg">
                      {" "}
                      Live update from smartphone web app
                    </span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg">
                      {" "}
                      Ready in just 2 working days
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Feature description End */}
        </div>
      </section>
      <section className="col-span-12 container h-full py-10 xl:pb-28">
        <div className="col-start-2 col-span-10 lg:col-start-2 lg:col-span-10 3xl:col-start-3 3xl:col-span-8  flex flex-col gap-4 lg:flex-row-reverse lg:justify-between xl:gap-0">
          {/* Feature image */}
          <h2 className="text-2xl md:hidden md:text-4xl text-heading-base font-semibold md:font-bold text-center md:text-center lg:text-start">
            <span className="md:block ">Single Page Web App</span>
            <span></span>
          </h2>
          <figure className="block lg:flex-1 aspect-h-4 aspect-w-3 lg:aspect-h-2 lg:aspect-w-3">
            <img
              className="object-cover"
              src="../images/newd.png"
              alt="agency app image"
            />
          </figure>

          {/* Feature description */}
          <div className="flex flex-col gap-8 md:gap-12 lg:w-[55%]  lg:pt-24 2xl:pt-12 2xl:flex-1 ">
            {/* Intro */}
            <div className="flex flex-col gap-5 md:items-center lg:items-start">
              <h2 className="text-2xl hidden md:block md:text-4xl text-heading-base font-semibold md:font-bold text-center md:text-center lg:text-start">
                <span className="md:block ">Single Page Web App</span>
                <span></span>
              </h2>

              <p className="text-heading-base text-center md:text-center lg:text-start font-light leading-7 md:text-lg max-w-md md:max-w-lg">
                A fast and captivating website to introduce your buisness to
                customers resuming the most important features of your activity.
                Ideal for small business with few products and marketing
                campaigns, with a focus on restaurants, cafes, bar, bistrò...
              </p>
            </div>
            {/* Intro End  */}

            {/* feature list */}
            <div className="flex flex-col gap-5 text-sm md:text-base md:items-start md:gap-7 md:justify-center">
              <div className="flex flex-col  gap-3 md:gap-20 sm:pl-[5vw] lg:pl-0">
                <ul className="flex flex-col gap-3">
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg">
                      {" "}
                      "Menù and QR code" features
                    </span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg"> 1-5 sections </span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg">
                      {" "}
                      Social media integration
                    </span>
                  </li>

                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg"> Google Maps integration</span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg">
                      {" "}
                      Captivating and customized design
                    </span>
                  </li>
                  <li>
                    <img
                      className="w-8 pr-3 inline-block"
                      src="../images/icons/check-circle.png"
                      alt="check success icon"
                    />
                    <span className="md:text-lg">
                      {" "}
                      Ready in just 4 working days
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Feature description End */}
        </div>
      </section>
      <section className="col-span-12 container h-full py-10 xl:pb-28">
        <div className="col-start-2 col-span-10 lg:col-start-2 lg:col-span-10 3xl:col-start-3 3xl:col-span-8  flex flex-col gap-4 lg:flex-row-reverse lg:justify-between xl:gap-0">
          {/* Feature image */}
          <h2 className="text-2xl md:hidden md:text-4xl text-heading-base font-semibold md:font-bold text-center md:text-center lg:text-start">
            <span className="md:block ">Multiple Page Web App</span>
            <span></span>
          </h2>
          <figure className="block lg:flex-1 aspect-h-4 aspect-w-3 lg:aspect-h-2 lg:aspect-w-3 lg:-mt-[10vh]">
            <img
              className="object-contain lg:p-[20px] lg:ml-[60px]"
              src="../images/png6.png"
              alt="agency app image"
            />
          </figure>

          {/* Feature description */}
          <div className="flex flex-col gap-8 md:gap-12 lg:w-[55%]  lg:pt-24 2xl:pt-12 2xl:flex-1 ">
            {/* Intro */}
            <div className="flex flex-col gap-5 md:items-center lg:items-start">
              <h2 className="text-2xl hidden md:block md:text-4xl text-heading-base font-semibold md:font-bold text-center md:text-center lg:text-start">
                <span className="md:block ">Multiple Page Web App</span>
                <span></span>
              </h2>

              <p className="text-heading-base text-center md:text-center lg:text-start font-light leading-7 md:text-lg max-w-md md:max-w-lg">
                Provide a more specific introduction to your business separating
                content into different pages. Make the real difference letting
                your customers passionate about your products.
              </p>
            </div>
            {/* Intro End  */}

            {/* feature list */}
            <div className="flex flex-col gap-5 text-sm md:text-base md:items-start md:gap-7 md:justify-center">
              <div className="flex flex-col sm:pl-[5vw] lg:pl-0 gap-3 md:gap-20">
                <ul className="flex flex-col gap-3">
                  {data?.map((item, index) => (
                    <li key={index} className="max-w-md flex">
                      <img
                        className="w-8 max-h-5 pr-3 relative"
                        src="../images/icons/check-circle.png"
                        alt="check success icon"
                      />
                      <span className="inline-block md:text-lg">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* Feature description End */}
        </div>
      </section>
    </>
  );
}
function Accordion({ heading, description }) {
  const handleOpen = (e) => {
    const accordion = e.target;
    const allAccordions = [...accordion.parentElement.children];
    const content = accordion.querySelector("p");
    const arrow = accordion.querySelector("figure");

    allAccordions.forEach((element) => {
      element.querySelector("p").classList.remove("active");
      element.querySelector("figure").classList.remove("active");
      element.classList.remove("active");
    });
    accordion.classList.add("active");
    content.classList.add("active");
    arrow.classList.add("active");
  };
  return (
    <div
      className=" bg-background-secondary py-4 px-5 sm:py-6 sm:px-8 xl:py-8 w-full h-[4.5rem] [&.active]:h-[11rem] flex flex-col gap-3 rounded-lg [&.active]:bg-background-base drop-shadow-md hover:drop-shadow-xl [&.active]:drop-shadow-xl  transition-all duration-1000 cursor-pointer overflow-hidden"
      onClick={handleOpen}
    >
      <h3 className="text-bodytxt-secondary text-[.65rem] sm:text-sm lg:text-lg font-bold flex items-center justify-between pointer-events-none">
        <span>{heading}</span>
        <figure className="opacity-100 [&.active]:rotate-90 [&.active]:scale-75  transition-transform duration-700">
          <img
            src={"../images/icons/right-arrow.png"}
            alt={"help and support icon"}
          />
        </figure>
      </h3>

      <p className="text-heading-base font-light leading-7 md:text-lg max-w-md md:max-w-lg opacity-0 relative translate-y-[-40%] [&.active]:translate-y-[0%] [&.active]:opacity-100  pointer-events-none transition-all duration-[.84s]">
        {description}
        <br />
      </p>
    </div>
  );
}
