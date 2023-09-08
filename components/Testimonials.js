import React from 'react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
export default function Testimonials({ testimonials }) {
  return (
    <section
      data-section='testimonials'
      className='col-span-12 container h-full py-20 bg-primary-base/10'
    >
      <div className='col-span-12 flex flex-col gap-16 items-center justify-center'>
        <div className='flex flex-col gap-3 items-center'>
          <h3 className='text-xl sm:text-2xl md:text-3xl xl:text-4xl text-heading-base text-center font-bold'>
            What client say about us
          </h3>
          <p className='text-heading-base/60 text-center font-medium tracking-wider leading-7 text-xs  lg:text-lg'>
            Customer testimonial
          </p>
        </div>
        {/* Testimonials Slides */}
        <div className='w-full h-full'>
          <Swiper
            loop={true}
            loopedSlides={3}
            grabCursor={true}
            centeredSlides={true}
            centeredSlidesBounds={true}
            modules={[Mousewheel]}
            direction={'horizontal'}
            mousewheel={{ invert: true }}
            draggable={true}
            slidesPerView={'auto'}
            passiveListeners={true}
          >
            {testimonials.map((testimonial, idx, array) => {
              const fromLeft = idx;
              const fromRight = array.length - 1 - idx;
              return (
                <SwiperSlide
                  key={testimonial.id}
                  className='basis-[max-content]'
                >
                  <div
                    className={
                      'flex flex-col items-center gap-6 px-5 py-8 justify-evenly h-full '
                    }
                  >
                    <Testimonial data={array[fromLeft]} />
                    <Testimonial data={array[fromRight]} />
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
function Testimonial({ data }) {
  return (
    <div className='bg-background-secondary min-h-fit min-w-fit max-w-[290px] py-6 px-5 flex flex-col gap-6 md:gap-8 rounded-sm drop-shadow-sm hover:drop-shadow-lg transition-all duration-700 '>
      <p className='text-heading-base/80 text-start font-light leading-5 text-xs  lg:text-lg max-w-md md:max-w-lg lg:min-w-[400px] select-none'>
        {data.text}
      </p>

      <div className='flex gap-3 select-none'>
        <div>
          <img src={data.avatar} alt={data.name} />
        </div>
        <h3>
          <span className='text-heading-base xl:text-lg font-medium'>
            {data.name}
          </span>
          <span className='block text-link text-xs md:text-base font-medium'>
            {data.username}
          </span>
        </h3>
      </div>
    </div>
  );
}
