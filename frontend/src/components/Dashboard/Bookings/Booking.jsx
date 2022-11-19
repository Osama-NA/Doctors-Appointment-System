import React from "react";
import styled from "styled-components";
import Img from "../../../assets/img/dashboard/profile-img.jpg";
import Button from "../../Buttons/Button";
import Date from "../Appointments/Date";

const Booking = ({ booking, cancelBooking, role, confirmBooking }) => {
  return (
    <>
      <Wrapper className="booking">
        <img
          src={booking.user.profileImage ? booking.user.profileImage : Img}
          alt=""
        />

        <div className="info">
          <h2>{booking.user.username}</h2>
          <p>Appointment reason: {booking.reason}</p>

          <Date allowReschedule={false} date={booking.date} />

          {role === "patient" ? (
            <ButtonsWrapper>
              <Button
                type="danger"
                text="Cancel Appointment"
                action={cancelBooking}
              />
            </ButtonsWrapper>
          ) : (
            <ButtonsWrapper>
              <Button type="primary" text="Confirm" action={confirmBooking} />
              <Button type="danger" text="Decline" action={cancelBooking} />
            </ButtonsWrapper>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Booking;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d1d1d1;
  padding: 1.5rem 0;

  img {
    border-radius: 50%;
    width: 75px;
    height: 75px;
    object-fit: contain;
  }

  .info {
    padding-left: 1.5rem;

    h2 {
      font-size: 22px;
      line-height: 26px;
      margin-top: 0.75rem;
    }
    p {
      line-height: 20px;
      margin: 0.25rem 0;
    }
  }

  @media (max-width: 860px) {
    padding: 1.25rem 0;
    flex-direction: column;

    img {
      width: 60px;
      height: 60px;
    }

    .info {
      padding-left: 0;
      padding-top: 0.5rem;

      h2 {
        font-size: 18px;
        line-height: 22px;
      }
      p {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-self: flex-end;

  button:nth-child(1) {
    margin-right: 0.5rem;
  }

  @media (max-width: 860px) {
    button:nth-child(1) {
      margin-right: 0.35rem;
    }
  }
`;
