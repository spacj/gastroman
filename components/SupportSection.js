import Image from 'next/image';
import React from 'react';

function SupportSection() {
  return (
    <section
      data-section='support'
      className='col-span-12 container h-full py-24 md:py-40'
    >
      <div className='col-start-2 col-span-10 3xl:col-start-3 3xl:col-span-8 flex flex-col gap-14 md:flex-row md:gap-4 xl:gap-12'>
        {/* Support card */}
        <SupportCard />
        <SupportCard />
      </div>
    </section>
  );
}

export default SupportSection;
function SupportCard() {
  return (
    <div className='py-5 px-5 sm:py-8 sm:px-10 xl:py-10 xl:px-12 w-full rounded-xl bg-background-base hover:bg-background-secondary hover:shadow-2xl flex flex-col gap-4 shadow-lg transition-all duration-1000 xl:flex-row'>
      <figure className=''>
        <img
          src={'../images/support.png'}
          alt={'help and support icon'}
          width={100}
          height={100}
        />
      </figure>

      <div className='flex flex-col gap-4 '>
        <h2 className='text-bodytxt-secondary lg:text-lg font-bold flex items-center gap-3'>
          <span>Do you need help support</span>
          <img
            src={'../images/icons/right-arrow.png'}
            alt={'help and support icon'}
            width={26}
            height={26}
          />
        </h2>

        <p className='text-heading-base font-light leading-7 md:text-lg max-w-md md:max-w-lg'>
          Get your website ads tests delivered at let collect sample from the
          victory of the update managments services.
        </p>
      </div>
    </div>
  );
}
