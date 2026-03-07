import React, { useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const AddBook = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookData = {
      ...formData,
      user_email: user?.email,
      user_name: user?.displayName,
      upvote: 0,
    };

    try {
      const res = await axios.post("http://localhost:3000/books", bookData);

      if (res.data.insertedId) {
        alert("Book Added Successfully 📚");
        setFormData({
          book_title: "",
          cover_photo: "",
          total_page: "",
          book_author: "",
          book_category: "Fiction",
          reading_status: "Want-to-Read",
          book_overview: "",
          upvote: 0,
        });
      }
    } catch (error) {
      console.log(error);
      alert("Failed to add book");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          📚 Add New Book
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

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
              placeholder="Enter Book Title"
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
              placeholder="Enter Image URL"
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
              placeholder="Number of pages"
            />
          </div>

          {/* Book Author */}
          <div>
            <label className="font-semibold">Book Author</label>
            <input
              type="text"
              name="book_author"
              value={formData.book_author}
              onChange={handleChange}
              required
              className="input input-bordered w-full mt-1"
              placeholder="Author name"
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
            <label className="font-semibold">Book Category</label>
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

          {/* Book Overview */}
          <div className="md:col-span-2">
            <label className="font-semibold">Book Overview</label>
            <textarea
              name="book_overview"
              value={formData.book_overview}
              onChange={handleChange}
              required
              rows="4"
              className="textarea textarea-bordered w-full mt-1"
              placeholder="Write short overview..."
            ></textarea>
          </div>

          {/* Upvote (Read Only) */}
          <div>
            <label className="font-semibold">Upvote</label>
            <input
              type="number"
              value="0"
              readOnly
              className="input input-bordered w-full mt-1 bg-gray-100"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 text-center">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Add Book 📚
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;