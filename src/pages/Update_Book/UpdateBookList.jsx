import React, { useEffect, useState } from "react";
import axios from "axios";

import { FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router";
import useAuth from "../../hooks/useAuth";

const UpdateBookList = () => {
    const { user } = useAuth();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (user?.email) {
            axios
                .get(`http://localhost:3000/mybooks?email=${user.email}`)
                .then((res) => {
                    setBooks(res.data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error(err);
                    if (err.response?.status === 404) {
                        setErrorMsg("You haven't added any books yet.");
                    } else if (err.response?.status === 403) {
                        setErrorMsg("Forbidden: You can only see your own books.");
                    } else {
                        setErrorMsg("Failed to load books. Try again later.");
                    }
                    setLoading(false);
                });
        }
    }, [user]);


    const handleDelete = async (bookId) => {
        if (!window.confirm("Are you sure you want to delete this book?")) return;

        try {
            const res = await axios.delete(`http://localhost:3000/books/${bookId}`);
            if (res.data.deletedCount) {
                // Remove from UI instantly
                const remaining = books.filter((b) => b._id !== bookId);
                setBooks(remaining);
            }
        } catch (err) {
            console.error(err);
            alert("Failed to delete book");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
                Loading Your Books...
            </div>
        );
    }

    if (errorMsg) {
        return (
            <div className="flex justify-center items-center min-h-screen text-lg text-gray-600">
                {errorMsg}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-5">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
                    📚 My Books
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <div
                            key={book._id}
                            className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition"
                        >
                            <img
                                src={book.cover_photo}
                                alt={book.book_title}
                                className="w-full h-64 object-cover"
                            />

                            <div className="p-5 space-y-3">
                                <h2 className="text-lg font-bold text-gray-800">
                                    {book.book_title}
                                </h2>

                                <p className="text-sm text-gray-600">
                                    Author: {book.book_author}
                                </p>

                                <span className="inline-block bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                    {book.book_category}
                                </span>

                                <div className="flex items-center gap-2 text-gray-700">
                                    <FaThumbsUp className="text-green-500" />
                                    <span className="font-semibold">{book.upvote}</span>
                                </div>


                                <div className="flex gap-2 pt-2">
                                    <Link
                                        to={`/updatebook/${book._id}`}
                                        className="w-1/2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-center"
                                    >
                                        Edit
                                    </Link>

                                    <button
                                        onClick={() => handleDelete(book._id)}
                                        className="w-1/2 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpdateBookList;