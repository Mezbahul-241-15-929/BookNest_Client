import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";
import useAuth from "../hooks/useAuth";
import { FaThumbsUp } from "react-icons/fa";

const BookDetails = () => {

  const { id } = useParams();
  console.log("fasdfasdfasdfasdfsadfasdfasdfsadfsadfsadf");
  const { user } = useAuth();

  

  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  // Fetch book
  useEffect(() => {
    axios.get(`http://localhost:3000/book/${id}`)
      .then(res => setBook(res.data))
  }, [id]);

  // Fetch reviews
  useEffect(() => {
    axios.get(`http://localhost:3000/reviews/${id}`)
      .then(res => setReviews(res.data))
  }, [id]);

  // Upvote
  const handleUpvote = async () => {

    if (user?.email === book.user_email) {
      alert("You cannot upvote your own book");
      return;
    }

    const res = await axios.patch(`http://localhost:3000/books/upvote/${id}`);

    if (res.data.modifiedCount > 0) {
      setBook({ ...book, upvote: book.upvote + 1 });
    }

  };

  // Add Review
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      bookId: id,
      review: reviewText,
      user_email: user.email,
      user_name: user.displayName
    };

    const res = await axios.post("http://localhost:3000/reviews", reviewData);

    if (res.data.insertedId) {
      setReviews([...reviews, reviewData]);
      setReviewText("");
    }
  };

  // Delete review
  const handleDelete = async (reviewId) => {

    const res = await axios.delete(`http://localhost:3000/reviews/${reviewId}`);

    if (res.data.deletedCount > 0) {
      setReviews(reviews.filter(r => r._id !== reviewId));
    }

  };



  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">

      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-8">

          {/* Book Image */}
          <img
            src={book.cover_photo}
            alt={book.book_title}
            className="w-full rounded-lg"
          />

          {/* Book Info */}
          <div className="space-y-3">

            <h1 className="text-3xl font-bold">{book.book_title}</h1>

            <p><strong>Author:</strong> {book.book_author}</p>

            <p><strong>Total Pages:</strong> {book.total_page}</p>

            <p><strong>Category:</strong> {book.book_category}</p>

            <p><strong>Status:</strong> {book.reading_status}</p>

            <p className="pt-2">
              <strong>Overview:</strong> {book.book_overview}
            </p>

            <div className="pt-3">
              <p><strong>Added By:</strong> {book.user_name}</p>
              <p><strong>Email:</strong> {book.user_email}</p>
            </div>

            {/* Upvote */}
            <button
              onClick={handleUpvote}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
            >
              <FaThumbsUp />
              Upvote ({book.upvote || 0})
            </button>

          </div>

        </div>

      </div>


      {/* Reviews Section */}

      <div className="max-w-6xl mx-auto mt-10 bg-white p-8 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">💬 Reviews</h2>

        {/* Review Form */}

        {user && (

          <form onSubmit={handleReviewSubmit} className="mb-6">

            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
              className="textarea textarea-bordered w-full"
              placeholder="Write your review..."
            />

            <button className="mt-3 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Submit Review
            </button>

          </form>

        )}


        {/* Review List */}

        <div className="space-y-4">

          {reviews.map((review) => (

            <div key={review._id} className="border p-4 rounded">

              <p className="font-semibold">{review.user_name}</p>

              <p className="text-gray-600 text-sm mb-2">{review.user_email}</p>

              <p>{review.review}</p>

              {/* User actions */}

              {user?.email === review.user_email && (

                <div className="flex gap-3 mt-3">

                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(review._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </div>

              )}

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default BookDetails;