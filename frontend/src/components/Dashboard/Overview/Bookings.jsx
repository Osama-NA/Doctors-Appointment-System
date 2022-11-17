import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
import Booking from "./Booking";

const Bookings = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  return (
    <Wrapper>
      <Header>
        <h2>New Bookings</h2>
        <button onClick={() => navigate(`/dashboard/doctor/bookings`)}>
          view all
        </button>
      </Header>

      <div className="flex flexColumn">
        {true ? (
          <>
            <Booking />
            <Booking />
            <Booking />
          </>
        ) : (
          <p className="no-results">No new bookings found</p>
        )}
      </div>
    </Wrapper>
  );
};

export default Bookings;

const Wrapper = styled.div`
  width: 33vw;
  max-width: 500px;
  min-width: 425px;
  min-height: 275px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem 0;
  margin-bottom: 1rem;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  @media (max-width: 1200px) {
    width: 550px;
  }
  @media (max-width: 860px) {
    width: 100%;
    max-width: 400px;
    min-width: 275px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto .75rem;

    .no-results {
      font-size: 12px;
    }
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;

  h2 {
    font-size: 20px;
    font-weight: 600;
  }
  button {
    cursor: pointer;
    outline: none;
    border: none;
    font-size: 16px;
    color: #808080;
    background-color: transparent;
    padding: 0;
    transition: all 0.1s ease;

    &:hover {
      color: #686666;
    }
  }

  @media (max-width: 860px) {
    h2 {
      font-size: 16px;
    }
    button {
      font-size: 12px;
    }
  }
`;
