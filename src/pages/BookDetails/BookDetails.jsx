import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const {user} = useAuth();

  const [book, setBook] = useState({});
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch Book
  useEffect(() => {
    fetch(`http://localhost:3000/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      });
  }, [id]);

  // Fetch Reviews
  const loadReviews = () => {
    fetch(`http://localhost:3000/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  };

  useEffect(() => {
    loadReviews();
  }, [id]);

  // Upvote Book
  const handleUpvote = async () => {
    if (user?.email === book?.user_email) {
      toast.success("You cannot upvote your own book");
      
      return;
    }

    const res = await fetch(`http://localhost:3000/upvote/${id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        user_email: user?.email,
      }),
    });

    const data = await res.json();

    if (data.modifiedCount) {
      setBook({ ...book, upvote: (book.upvote || 0) + 1 });
    }
  };

  // Submit Review
  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login first");
      return;
    }

    const reviewData = {
      bookId: id,
      review: reviewText,
      user_email: user.email,
      user_name: user.displayName,
    };

    const res = await fetch("http://localhost:3000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviewData),
    });

    const data = await res.json();

    if (data.insertedId) {
      const newReview = {
        ...reviewData,
        _id: data.insertedId,
      };

      setReviews([newReview, ...reviews]);
      setReviewText("");
    } else {
      toast.error(data.message);
    }
  };

  // Delete Review
  const handleDelete = async (reviewId) => {
    const res = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.deletedCount) {
      const remaining = reviews.filter((r) => r._id !== reviewId);
      setReviews(remaining);
    }
  };

  // Start Editing
  const handleEditClick = (review) => {
    setEditingId(review._id);
    setEditText(review.review);
  };

  // Update Review
  const handleUpdateReview = async (reviewId) => {
    const res = await fetch(`http://localhost:3000/reviews/${reviewId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        review: editText,
      }),
    });

    const data = await res.json();

    if (data.modifiedCount) {
      const updatedReviews = reviews.map((r) =>
        r._id === reviewId ? { ...r, review: editText } : r
      );

      setReviews(updatedReviews);
      setEditingId(null);
    }
  };

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="max-w-6xl mx-auto p-6">

      {/* Book Section */}
      <div className="grid md:grid-cols-2 gap-10 mb-12">

        <img
          src={book.cover_photo}
          alt={book.book_title}
          className="w-full rounded-lg shadow"
        />

        <div>
          <h1 className="text-3xl font-bold mb-4">{book.book_title}</h1>

          <p><b>Author:</b> {book.book_author}</p>
          <p><b>Category:</b> {book.book_category}</p>
          <p><b>Total Pages:</b> {book.total_page}</p>
          <p><b>Status:</b> {book.reading_status}</p>

          <p className="mt-4 text-gray-700">{book.book_overview}</p>

          <div className="mt-4">
            <p><b>Added by:</b> {book.user_name}</p>
            <p>{book.user_email}</p>
          </div>

          <button
            onClick={handleUpvote}
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600  mt-6  text-white px-5 py-2 rounded hover:bg-blue-700"
          >
            🔼 Upvote ({book.upvote || 0})
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div>

        <h2 className="text-2xl font-bold mb-4">Reviews</h2>

        {/* Add Review */}
        <form onSubmit={handleSubmitReview} className="mb-6">

          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 mt-2 bg-green-600 text-white px-4 py-2 rounded"
          >
            Submit Review
          </button>

        </form>

        {/* Review List */}
        <div className="space-y-4">

          {reviews.length === 0 && (
            <p className="text-gray-500">No reviews yet.</p>
          )}

          {reviews.map((review) => (

            <div
              key={review._id}
              className="border rounded p-4 shadow-sm"
            >

              <p className="font-semibold">{review.user_name}</p>

              {editingId === review._id ? (

                <div>

                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full border p-2 rounded"
                  />

                  <div className="flex gap-3 mt-2">

                    <button
                      onClick={() => handleUpdateReview(review._id)}
                      className="text-green-600 cursor-pointer"
                    >
                      Save
                    </button>

                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-500 cursor-pointer"
                    >
                      Cancel
                    </button>

                  </div>

                </div>

              ) : (

                <div>

                  <p className="text-gray-700">{review.review}</p>

                  {review.user_email === user?.email && (

                    <div className="flex gap-4 mt-2">

                      <button
                        onClick={() => handleEditClick(review)}
                        className="text-blue-500 cursor-pointer"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(review._id)}
                        className="text-red-500 cursor-pointer"
                      >
                        Delete
                      </button>

                    </div>

                  )}

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