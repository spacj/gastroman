import React from 'react';
import { motion } from 'framer-motion';

export function Logo({ Wrapperclasses, className, white }) {
  const logoSrc = !white ? `../images/logoss.png` : `../images/logoss.png`;
  return (
    <motion.figure
      className={`flex items-center w-fit h-full xl:w-fit ${Wrapperclasses}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        bounce: 0.15,
        duration: 0.05,
      }}
    >
      <img
        className={`-ml-5 mt-2 object-cover ${className}`}
        src={logoSrc}
        alt={'logo img'}
        width={250}
        height={27}
      />
    </motion.figure>
  );
}
