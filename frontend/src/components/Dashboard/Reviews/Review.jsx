import React from "react";
import styled from "styled-components";
import Review from "../../Elements/Review";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

const ReviewContainer = ({setShowConfirmTab, review, setDeletedReview}) => {
  const handleDelete = () => {
    setDeletedReview(review)
    setShowConfirmTab(true)
  }

  return (
    <Wrapper>
      <Review
        reviewBy={review.reviewed_by}
        review={review.review}
        rate={review.rating}
      />
      <FontAwesomeIcon icon={faTrashCan} className="delete" onClick={handleDelete} />
    </Wrapper>
  );
};

export default ReviewContainer;

const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .delete {
    position: relative;
    top: -8px;
    margin-left: 1.5rem;
    font-size: 18px;
    cursor: pointer;
    color: #f95f5f;

    &:hover {
      transition: all 0.1s ease;
      color: #e65656;
    }
  }
  @media (max-width: 860px) {
    .delete {
      top: -6px;
      margin-left: 1.25rem;
      font-size: 16px;
    }
  }
`;
