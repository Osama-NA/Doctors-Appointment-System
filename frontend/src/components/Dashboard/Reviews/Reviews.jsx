import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Review from './Review'
import ConfirmTab from "../../Elements/ConfirmTab";
import { UserContext } from "../../../context/User";
import Loader from "../../Elements/Loader";
import { post, get } from "../../../utils/fetch";
import SuccessMessage from "../../Elements/SuccessMessage";

const Reviews = () => {
  const { userInfo } = useContext(UserContext);

  const [showConfirmTab, setShowConfirmTab] = useState(false)
  const [refresh, setRefresh] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [deletedReview, setDeletedReview] = useState({})

  const getReviews = useCallback(async () => {
    const data = await get(
      process.env.REACT_APP_API_HOST +
        "dashboard/reviews?id=" +
        userInfo._id
    );

    if (data.status === "ok") {
      setReviews(data.reviews);
    } else {
      alert("Failed to fetch reviews");
    }
  }, [userInfo._id])

  useEffect(() => {
    getReviews();

    return () => setReviews([]);
  }, [getReviews, refresh]);

  const deleteReview = useCallback(async (reviewId) => {
    setLoading(true);

    const data = await post(
      process.env.REACT_APP_API_HOST +
        "dashboard/delete-review",
        {
          token: localStorage.getItem("token"),
          review_id: reviewId,
        }
    );

    setDeletedReview({})
    setLoading(false);

    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setRefresh(!refresh);
    } else {
      alert("Failed to delete review");
    }
  }, [refresh])

  useEffect(() => {
    getReviews();

    return () => setReviews([]);
  }, [getReviews, refresh]);

  return (
    <>
    <Wrapper>
      <h1>Reviews</h1>

      <Container>
        {reviews.length > 0 ? (
          reviews.map(review => {
           return <Review key={review._id} setShowConfirmTab={setShowConfirmTab} review={review} setDeletedReview={setDeletedReview} />
          })
        ) : (
          <p className="no-results">You do not have any reviews yet</p>
        )}
        <Loader visible={loading} />
      </Container>
    </Wrapper>

    {
      showConfirmTab &&
      <ConfirmTab 
        setShow={setShowConfirmTab}
        promptText='Are you sure you want to delete this review?'
        type='danger'
        cta='Delete'
        action={() => {
          deleteReview(deletedReview)
          setShowConfirmTab(false)
        }}
      />
    }
    {showSuccessMessage && (
      <SuccessMessage
        setShow={setShowSuccessMessage}
        message='Review successfully deleted'
      />
    )}
    </>
  );
};

export default Reviews;

const Wrapper = styled.div`
  h1 {
    text-align: center;
    font-size: 24px;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 18px;
    }
  }
`;
const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    .no-results {
      font-size: 12px;
    }
  }
`;