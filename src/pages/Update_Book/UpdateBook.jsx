import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const UpdateBook = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();

    const [formData, setFormData] = useState({
        book_title: "",
        cover_photo: "",
        total_page: "",
        book_author: "",
        book_category: "Fiction",
        reading_status: "Want-to-Read",
        book_overview: "",
        upvote: 0,
    });

    const [loading, setLoading] = useState(true);

    // Load existing book data
    useEffect(() => {
        axios.get(`https://book-nest-server-seven.vercel.app/books/${id}`)
            .then(res => {
                const book = res.data;

                // Check if the logged-in user is the owner
                if (book.user_email !== user?.email) {
                    toast.error("You can only edit your own book");
                    navigate("/");
                    return;
                }

                setFormData(book);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                toast.error("Failed to fetch book data");
                navigate("/");
            });
    }, [id, user, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.put(`https://book-nest-server-seven.vercel.app/books/${id}`, {
                ...formData,
                user_email: user?.email,
                user_name: user?.displayName,
            });

            if (res.data.modifiedCount) {
                toast.success("Book updated successfully!");
                navigate(`/books/${id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to update book");
        }
    };

    if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                    ✏️ Update Book
                </h2>

                <form onSubmit={handleUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Book Title */}
                    <div>
                        <label className="font-semibold">Book Title</label>
                        <input
                            type="text"
                            name="book_title"
                            value={formData.book_title}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    {/* Cover Photo */}
                    <div>
                        <label className="font-semibold">Cover Photo URL</label>
                        <input
                            type="text"
                            name="cover_photo"
                            value={formData.cover_photo}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    {/* Total Pages */}
                    <div>
                        <label className="font-semibold">Total Pages</label>
                        <input
                            type="number"
                            name="total_page"
                            value={formData.total_page}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    {/* Author */}
                    <div>
                        <label className="font-semibold">Author</label>
                        <input
                            type="text"
                            name="book_author"
                            value={formData.book_author}
                            onChange={handleChange}
                            required
                            className="input input-bordered w-full mt-1"
                        />
                    </div>

                    {/* User Email (Read Only) */}
                    <div>
                        <label className="font-semibold">User Email</label>
                        <input
                            type="text"
                            value={user?.email || ""}
                            readOnly
                            className="input input-bordered w-full mt-1 bg-gray-100"
                        />
                    </div>

                    {/* User Name (Read Only) */}
                    <div>
                        <label className="font-semibold">User Name</label>
                        <input
                            type="text"
                            value={user?.displayName || ""}
                            readOnly
                            className="input input-bordered w-full mt-1 bg-gray-100"
                        />
                    </div>

                    {/* Book Category */}
                    <div>
                        <label className="font-semibold">Category</label>
                        <select
                            name="book_category"
                            value={formData.book_category}
                            onChange={handleChange}
                            className="select select-bordered w-full mt-1"
                        >
                            <option>Fiction</option>
                            <option>Non-Fiction</option>
                            <option>Fantasy</option>
                        </select>
                    </div>

                    {/* Reading Status */}
                    <div>
                        <label className="font-semibold">Reading Status</label>
                        <select
                            name="reading_status"
                            value={formData.reading_status}
                            onChange={handleChange}
                            className="select select-bordered w-full mt-1"
                        >
                            <option>Read</option>
                            <option>Reading</option>
                            <option>Want-to-Read</option>
                        </select>
                    </div>

                    {/* Overview */}
                    <div className="md:col-span-2">
                        <label className="font-semibold">Book Overview</label>
                        <textarea
                            name="book_overview"
                            value={formData.book_overview}
                            onChange={handleChange}
                            rows="4"
                            className="textarea textarea-bordered w-full mt-1"
                        />
                    </div>

                    {/* Upvote (Read Only) */}
                    <div>
                        <label className="font-semibold">Upvote</label>
                        <input
                            type="number"
                            value={formData.upvote || 0}
                            readOnly
                            className="input input-bordered w-full mt-1 bg-gray-100"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 text-center">
                        <button
                            type="submit"
                            className="bg-gradient-to-r cursor-pointer from-blue-500 to-purple-600 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
                        >
                            Update Book ✏️
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default UpdateBook;