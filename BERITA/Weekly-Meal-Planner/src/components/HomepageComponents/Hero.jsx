import React from 'react'
import buger from '../../assets/images/buger.png'
import mood from '../../assets/images/mood.png'
import { motion } from 'framer-motion'

const Hero = () => {
  return (
    <section className=" flex flex-col items-center  text-center md:text-left md:items-center mx-auto max-w-4xl ">
      {/**First row: Burger + Image + good food */}
      <div className="flex items-center space-x-3 md:space-x-6">
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          src={buger}
          alt="buger illustration picture"
          className=" pt-2 w-[100px] md:w[200px] lg:w-[180px]  objects-contain"
        />

        <motion.h1
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="font-pacifico font-bold text-3xl md:text-5xl text-fontcolor"
        >
          Good Food
        </motion.h1>
      </div>
      {/**second roe: haapy girl image + Good Mood */}
      <div className="flex  items-center space-x-3 md:space-x-6 mt-4 ">
        <motion.h1
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          className="font-pacifico text-3xl md:text-5xl font-bold  text-fontcolor"
        >
          Good Mood!
        </motion.h1>
        <motion.img
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: 'easeOut', delay: 0.3 }}
          src={mood}
          alt="happy girl illustration picture "
          className="w-[150px] md:w-[250px]  lg:w-[260px] object-contain"
        />
      </div>
    </section>
  )
}

export default Hero
