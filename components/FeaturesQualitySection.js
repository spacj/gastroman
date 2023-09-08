import React from 'react';
import { ButtonPrimary } from './ButtonPrimary';
import { svgs } from './svgs';

export default function FeaturesQualitySection({ featureQuality }) {
  const handleClickSlider = (e) => {
    const clickedElement = e.target;
    const svgIcon = clickedElement.querySelector('svg');
    const tabBtn = clickedElement.querySelector('button');
    const length = clickedElement.getAttribute('data-length');

    const tabItems = [...tabBtn.parentElement.parentElement.children];
    const activeSlide = document.getElementById(`item${length}`);
    const slidesConatiner = activeSlide.parentElement;

    [...slidesConatiner.children].forEach((elm, idx) => {
      elm.classList.add('invisible', 'opacity-0');
      tabItems[idx].lastElementChild.classList.remove('active');
      tabItems[idx].firstElementChild.classList.remove('active');
    });

    svgIcon.classList.add('active');
    tabBtn.classList.add('active');

    activeSlide.classList.remove('invisible', 'opacity-0');
    slidesConatiner.style.setProperty('transform', `translateX(-${length}00%)`);
  };

  return (
    
    <section className='col-span-12 container h-full py-10 xl:pb-0 bg-sky-300'>
      <div className='col-start-2 col-span-10 xl:col-start-2 xl:col-span-12 3xl:col-start-3 flex flex-col gap-10 md:gap-16 overflow-hidden'>
        {/* Tabs */}
        <div id='scrolled-tab' className='overflow-x-scroll'>
          <ul className='snap-x  bg-sky-300 w-max flex gap-4 md:gap-8 py-5'>
            {featureQuality.map(({ name }, idx) => {
              return (
                <li
                  key={name}
                  data-length={`${idx}`}
                  onClick={handleClickSlider}
                  className='snap-mandatory snap-start min-w-fit flex-1 flex md:flex-col items-center md:items-start gap-2 md:gap-3 cursor-pointer'
                >
                  {/* Svg icon */}
                  <svg
                    width='30'
                    height='30'
                    viewBox='0 0 30 30'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    className={`pointer-events-none transition-all duration-700 fill-white opacity-40 [&.active]:fill-blue-700 [&.active]:opacity-100 ${
                      idx === 0 && 'active'
                    }`}
                  >
                    {svgs[idx]}
                  </svg>

                  <button
                    className={`md:border-t-2 md:pt-2 text-sm lg:text-lg md:[&.active]:border-blue-700 text-white [&.active]:text-blue-700 pointer-events-none transition-colors  duration-700 ${
                      idx === 0 && 'active'
                    }`}
                  >
                    {name}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
        {/* Tabs End */}

        {/* Feature items */}
        <div className='flex  items-center relative transition-all  duration-700  xl:pb-10'>
          {featureQuality.map(({ name, heading, desc, pic }, idx) => (
            <div
              key={name}
              id={`item${idx}`}
              className={`flex flex-col gap-5 md:gap-10 min-w-full xl:flex-row-reverse transition-all duration-500 ${
                idx === 0 ? 'visible opacity-100' : 'invisible opacity-0'
              } `}
            >
              <figure className='aspect-w-7 aspect-h-5 xl:aspect-w-12 xl:aspect-h-5 xl:w-full xl:left-12 xl:top-14'>
                <img
                  className='object-cover rounded-md'
                  src={pic}
                  alt='dashboard'
                />
              </figure>

              <div className='flex flex-col gap-6 xl:w-[70%]'>
                <h3 className='text-xl sm:text-2xl md:text-3xl xl:text-4xl text-white font-bold'>
                  {heading}
                </h3>

                <p className='text-white text-start font-light leading-7 text-xs  lg:text-lg max-w-md md:max-w-lg'>
                  {desc}
                </p>

                <div className='w-fit'>

                </div>
              </div>
            </div>
          ))}
        </div>
        {/* Feature End*/}
      </div>
    </section>
  );
}
