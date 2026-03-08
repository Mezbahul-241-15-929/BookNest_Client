import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router";

const PopularBooks = () => {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        axios
            .get("http://localhost:3000/popular-books")
            .then((res) => {
                setBooks(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setError("Failed to load books");
                setLoading(false);
            });

    }, []);

    if (loading) {
        return (
            <div className="text-center py-20 text-xl font-semibold">
                Loading popular books...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-20 text-red-500 text-xl">
                {error}
            </div>
        );
    }

    return (

        <section className="bg-gray-100 py-16 px-4">

            <div className="max-w-7xl mx-auto">

                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    Popular Books
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

                    {books.map((book) => (

                        <motion.div
                            key={book._id}
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl"
                        >

                            {/* Book Cover */}
                            <img
                                src={book.cover_photo}
                                alt={book.book_title}
                                className="w-full h-60 object-cover"
                            />

                            <div className="p-5 space-y-3">

                                {/* Title */}
                                <h3 className="text-lg font-bold text-gray-800 line-clamp-1">
                                    {book.book_title}
                                </h3>

                                {/* Author */}
                                <p className="text-gray-600 text-sm">
                                    Author: {book.book_author}
                                </p>

                                {/* Category */}
                                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                    {book.book_category}
                                </span>

                                {/* Upvote */}
                                <div className="flex items-center gap-2 text-gray-700 pt-2">
                                    <FaThumbsUp className="text-green-500" />
                                    <span className="font-semibold">
                                        {book.upvote}
                                    </span>
                                </div>

                                {/* Details Button */}
                                <Link to={`/books/${book._id}`}>
                                    <button className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:opacity-90 transition">
                                        View Details
                                    </button>
                                </Link>

                            </div>

                        </motion.div>

                    ))}

                </div>

            </div>

        </section>

    );
};

export default PopularBooks;