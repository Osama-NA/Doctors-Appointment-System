import React from "react";
import styled from "styled-components";
import Appointment from "./Appointment";

const Appointments = () => {
  return (
    <Wrapper>
      <h1>Appointments</h1>

      <Container>
        {true ? (
          <>
            <Appointment />
            <Appointment />
            <Appointment />
          </>
        ) : (
          <p className="no-results">No recent appointments found</p>
        )}
      </Container>
    </Wrapper>
  );
};

export default Appointments;

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
  width: 100%;
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .appointment:nth-child(1) {
    padding: 0.25rem 0 1.5rem;
  }
  .appointment:nth-last-child(1) {
    border-bottom: none;
  }
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
