import { motion } from "framer-motion";
import StatsCounter from "../StatsCounter/StatsCounter";
import heroImage from '../../../assests/hero.png'
const FashionHero = () => {
  return (
    <section className="relative overflow-hidden bg-[#f5f3f3] min-h-screen flex items-center">

      {/* Glow Effect */}
      <motion.div
        className="absolute right-10 top-20 h-[450px] w-[450px] rounded-full bg-white blur-[100px]"
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <motion.span
              className="text-xs font-bold tracking-[4px] text-gray-500"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              PREMIUM FASHION
            </motion.span>

            <motion.h1
              className="mt-4 text-5xl md:text-6xl lg:text-7xl font-black leading-none tracking-tight text-black"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
              }}
            >
              FIND CLOTHES
              <br />
              THAT MATCHES
              <br />
              YOUR STYLE
            </motion.h1>

            <motion.p
              className="mt-6 max-w-md text-gray-500 text-sm leading-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.5,
                duration: 0.7,
              }}
            >
              Browse through our diverse range of meticulously
              crafted garments, designed to bring out your
              individuality and cater to your sense of style.
            </motion.p>

            <motion.button
              className="mt-8 flex items-center gap-3 rounded-full bg-black px-8 py-4 text-sm font-medium text-white"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 0.7,
                duration: 0.5,
              }}
              whileHover={{
                scale: 1.05,
                y: -3,
              }}
              whileTap={{
                scale: 0.95,
              }}
            >
              Shop Now
              <span>→</span>
            </motion.button>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.9,
                duration: 0.7,
              }}
            >
              <StatsCounter />
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="relative flex justify-center items-end"
            initial={{
              opacity: 0,
              x: 80,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{
              duration: 1,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Star Top */}
            <motion.div
              className="absolute right-10 top-10 text-5xl text-black"
              animate={{
                rotate: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              ✦
            </motion.div>

            {/* Star Middle */}
            <motion.div
              className="absolute left-10 top-1/3 text-3xl text-black"
              animate={{
                rotate: [0, -20, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
              }}
            >
              ✦
            </motion.div>

            <motion.img
              src={heroImage}
              alt="Fashion Models"
              className="w-full max-w-[650px] object-contain drop-shadow-2xl"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FashionHero;