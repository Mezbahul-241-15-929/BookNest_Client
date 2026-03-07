import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router";

const Bookshelf = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    axios
      .get("http://localhost:3000/books")
      .then((res) => {
        setBooks(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
        Loading Books...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          📚 Bookshelf
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition duration-300"
            >

              {/* Cover */}
              <img
                src={book.cover_photo}
                alt={book.book_title}
                className="w-full h-64 object-cover"
              />

              <div className="p-5 space-y-3">

                <h2 className="text-lg font-bold text-gray-800">
                  {book.book_title}
                </h2>

                <p className="text-gray-600 text-sm">
                  Author: {book.book_author}
                </p>

                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {book.book_category}
                </span>

                {/* Upvote */}
                <div className="flex items-center gap-2 text-gray-700 pt-2">
                  <FaThumbsUp className="text-green-500" />
                  <span className="font-semibold">{book.upvote}</span>
                </div>

                {/* View Details Button */}
                <Link to={`/book/${book._id}`}>
                  <button className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg cursor-pointer py-2 rounded-lg transition">
                    View Details
                  </button>
                </Link>

              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Bookshelf;