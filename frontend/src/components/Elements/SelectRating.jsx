import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarSolid } from "@fortawesome/free-solid-svg-icons";

const starsSizeArray = [1, 2, 3, 4, 5];

const SelectRating = ({ rating, setRating }) => {
  return (
    <Wrapper className="review-stars">
      {starsSizeArray.map(index => {
        return (
          <FontAwesomeIcon
            key={index}
            icon={rating >= index ? faStarSolid : faStarRegular}
            onClick={() => setRating(index)}
          />
        );
      })}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  padding-bottom: .25rem;

  svg {
    cursor: pointer;
    width: 16px;
    color: #ffbc3a;
    margin: 0 0.1rem;
  }

  @media (max-width: 860px) {
    padding-bottom: .275rem;

    svg {
      width: 13px;
      margin: 0 0.05rem;
    }
  }
`;

export default SelectRating;
