// src/components/PageTransition.jsx
import React from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }} // Starts slightly down and invisible
            animate={{ opacity: 1, y: 0 }}  // Fades in and slides up
            exit={{ opacity: 0, y: -10 }}   // Fades out and slides up
            transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth timing
            className="w-full h-full"
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;