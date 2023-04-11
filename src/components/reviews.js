import React, { useState, useEffect } from "react";
import axios from "axios";

function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://admin.tomedes.com/api/v1/get-reviews?page=1")
      .then((response) => {
        console.log(response);
        if (
          response.status === 200 &&
          response.data &&
          response.data.reviews &&
          Array.isArray(response.data.reviews)
        ) {
          setReviews(response.data.reviews);
          setLoading(false);
        } else {
          setError("Invalid data format.");
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Error fetching data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (reviews.length === 0) {
    return <p>No reviews found.</p>;
  }

  return (
    <div>
      {reviews.map((review) => (
        <div key={review.id}>
          <h2>{review.title}</h2>
          <p>{review.content}</p>
          <p>Rating: {review.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;