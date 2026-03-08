import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";

const Error404Page = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-indigo-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="text-center max-w-md bg-white p-10 rounded-3xl shadow-lg border"
            >
                <motion.h1
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 120 }}
                    className="text-6xl font-bold text-indigo-600 mb-4"
                >
                    404
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-lg text-gray-600 mb-6"
                >
                    Oops! Page not found.
                    <br />
                    The page you are looking for might have been removed or does not exist.
                </motion.p>

                <motion.img
                    src="https://cdn-icons-png.flaticon.com/512/4208/4208976.png"
                    alt="404 illustration"
                    className="mx-auto mb-6 w-40 h-40 object-contain"
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                />

                <Link to="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg font-semibold transition-all"
                    >
                        Go Home
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
};

export default Error404Page;