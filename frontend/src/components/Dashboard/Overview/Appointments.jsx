import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/User";
import Appointment from "./Appointment";

const Appointments = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(UserContext);

  return (
    <Wrapper role={userInfo.role}>
      <Header>
        <h2>Recent Appointments</h2>
        <button
          onClick={() => navigate(`/dashboard/${userInfo.role}/appointments`)}
        >
          view all
        </button>
      </Header>

      <div className="flex flexColumn">
        {true ? (
          <>
            <Appointment />
            <Appointment />
          </>
        ) : (
          <p className="no-results">No recent appointments found</p>
        )}
      </div>
    </Wrapper>
  );
};

export default Appointments;

const Wrapper = styled.div`
  width: ${({role}) => role==='doctor' ? '33vw' : '100%'};
  min-width: 425px;
  max-width: ${({role}) => role==='doctor' ? '500px' : '600px'};
  min-height: ${({role}) => role==='doctor' ? '550px' : '600px'};
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem 0;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  @media (max-width: 1200px) {
    width: ${({role}) => role==='doctor' ? '550px' : '100%'};
    min-height: ${({role}) => role==='doctor' ? '275px' : '600px'};
    margin: 0.25rem 0 0;
  }
  @media (max-width: 860px) {
    width: 100%;
    max-width: ${({role}) => role==='doctor' ? '400px' : '500px'};
    min-width: 275px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto .5rem;

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
