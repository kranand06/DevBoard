import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 text-center bg-theme text-theme-1">
      
      {/* Error Code */}
      <motion.h1
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="text-7xl font-extrabold text-accent"
      >
        404
      </motion.h1>

      {/* Educational Message */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-theme-1 mt-4"
      >
        Oops! You’re lost 📘
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-3 text-theme-2 max-w-md"
      >
        This page doesn’t exist or is under development.
      </motion.p>

      {/* Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="mt-6 flex gap-4 flex-wrap justify-center"
      >
        <Link to="/">
          <button className="bg-primary hover:bg-hover text-white px-6 py-2 rounded-xl shadow-lg transition duration-200">
            Return Home
          </button>
        </Link>
      </motion.div>

      {/* Footer Quote */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="mt-10 text-sm text-theme-2"
      >
        Keep exploring. 🌱
      </motion.div>
    </div>
  );
};

export default Error404;
