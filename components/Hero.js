import { ContactForm } from './ContactForm';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonPrimary } from './ButtonPrimary';

import { motion, useScroll } from 'framer-motion';
function Hero() {
  const section = useRef();
  const { scrollY } = useScroll();
  const [scrollYAxis, setScroll] = useState(0);

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setScroll(latest);
    });
  }, []);

  const ImgVariant = {
    offscreen: {
      x: '100%',
      opacity: 0.3,
    },
    onscreen: {
      x: 0,
      opacity: 1,

      transition: {
        type: 'spring',
        bounce: 0.2,
        duration: 0.65,
      },
    },
  };

  const heroTextVariant = {
    offscreen: {
      x: '-120%',
    },

    onscreen: {
      x: 0,
      transition: {
        type: 'spring',
        bounce: 0.2,
        duration: 0.65,
      },
    },
  };
  const heroItem = {
    offscreen: {
      x: '-100%',
    },

    onscreen: {
      x: 0,
    },
  };

  return (
    <section
      ref={section}
      data-section='home'
      className='bg-sky-300 col-span-12 container xl:min-h-screen h-full pb-0 lg:pb-0 overflow-hidden'
    >
      <div className='w-full border-black col-start-2 col-span-10 3xl:col-start-3 3xl:col-span-8 flex flex-col gap-12 lg:justify-between pt-[17vh] lg:pt-40 xl:pt-45 lg:flex-row lg:place-self-center xl:justify-between'>
        {/* Hero Text Content */}
        <motion.div
          className='flex flex-col gap-7 md:gap-10  justify-start md:items-center lg:items-start flex-1'
          variants={heroTextVariant}
          initial='offscreen'
          animate='onscreen'
        >
          <motion.h1
            className=' text-heading-base text-white drop-shadow-2xl text-4xl sm:text-3xl lg:text-5xl 2xl:text-6xl font-bold sm:text-center md:text-center lg:text-start'
            variants={heroItem}
            style={{
              translateX: `-${scrollYAxis * 0.12}px`,
            }}
          >
            <span className='md:block xl:pt-7 lg:pb-4 2xl:text-6xl font-titlee'>DIGITAL </span>
            <span className='lg:inline-block lg:pb-4 2xl:text-6xl font-titlee'>SOLUTIONS </span> <br/>
            <span className='lg:inline-block sm:text-lg xl:text-3xl font-titlee'>TO GASTRONOMY</span>
            <span className='xl:text-3xl font-titlee sm:text-lg'> ISSUES</span> <br/>

          </motion.h1>

          <motion.p
            className='text-heading-base text-white font-semibold drop-shadow-2xl leading-7 md:text-lg  max-w-md md:max-w-lg sm:text-center md:text-center lg:text-start font-titlee'
            variants={heroItem}
            style={{
              translateX: `-${scrollYAxis * 0.09}px`,
            }}
          >
         Digital products tailored on your business for customer experience, operations and management
        </motion.p>
          {/* Conatct Form */}
          <motion.div
            className='w-full flex md:justify-center transition-opacity'
            variants={heroItem}
            style={{
              translateX: `-${scrollYAxis * 0.09}px`,
            }}
          >
            <ContactForm
              successMessage={'Thanks you'}
              errorMessege={'Please inter a valid email address '}
            >
              <div className={`h-full sm:w-[60%]`}>
                <ButtonPrimary
                  className={
                    'sm:text-base font-sans text-white border-2 border-transparent hover:text-blue-700 hover:border-blue-700 hover:bg-transparent shadow-none transition-all duration-700'
                  }
                >
                  CONTACT ME!
                </ButtonPrimary>
              </div>
            </ContactForm>
          </motion.div>

          {/* Sponsored brands
            <div className='flex items-center gap-3'>
              <strong className='font-light text-bodytxt-base/80 flex-2'>
                Sponsored by:
              </strong>

              <ul className='flex items-center gap-3 flex-1'>
                <li className='w-full'>
                  <img
                    className='object-cover w-120 h-50'
                    alt='paypal sponser icon'
                    src={'../images/paypal.png'}
                    width={80}
                    height={80}
                  />
                </li>
                <li className='w-full'>
                  <img
                    className='object-cover w-120 h-50'
                    alt='google sponser icon'
                    src={'../images/google.png'}
                    width={80}
                    height={80}
                  />
                </li>

                <li className='w-full'>
                  <img
                    className='object-cover w-120 h-50'
                    alt='dropbox sponser icon'
                    src={'../images/dropbox.png'}
                    width={80}
                    height={80}
                  />
                </li>
              </ul>
            </div>*/}

        </motion.div>

        {/* Hero img */}
        <div className='flex justify--start flex-1 items-center w-full'>
          <motion.figure
            className='block aspect-w-4 aspect-h-6 w-full max-w-[760px] max-h-[450px] sm:max-h-[300px] sm:-mt-[10vh] sm:-mb-[10vh] xl:-mt-[20vh]'
            variants={ImgVariant}
            initial='offscreen'
            animate='onscreen'
            style={{ translateX: `${scrollYAxis * 0.15}px` }}
          >
            <img
              className='object-contain'
              src={'../images/png4.png'}
              alt={'Ultimate support system'}
            />
          </motion.figure>
        </div>
      </div>
    </section>
  );
}

export default Hero;
