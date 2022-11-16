import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";

const Date = () => {
  return (
    <Wrapper>
      <p>03/02/2022 | 12:00 PM</p>

      <div className="reschedule">
        <p>reschedule</p>
        <FontAwesomeIcon icon={faPenToSquare} />
      </div>
    </Wrapper>
  );
};

export default Date;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #808080;
  margin: 0 0 1rem;

  .reschedule {
    display: flex;
    color: #2d59eb;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.1s ease;

    svg {
      position: relative;
      top: 3px;
      padding-left: 0.35rem;
    }

    &:hover {
      color: #2248c5;
    }
  }

  @media (max-width: 860px) {
    margin: 0 0 .75rem;
  
    .reschedule {
      svg {
        font-size: 12px;
        top: 3.5px;
        padding-left: 0.25rem;
      }
    }
  }
`;
