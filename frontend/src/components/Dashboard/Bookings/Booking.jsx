import React from "react";
import styled from "styled-components";
import Img from "../../../assets/img/dashboard/profile-img.jpg";
import Button from "../../Buttons/Button";
import Date from "../Appointments/Date";

const Booking = () => {
    return (
      <>
        <Wrapper className="booking">
          <img src={Img} alt="" />
  
          <div className="info">
            <h2>Kamala Emmanuelle</h2>
            <p>
              Lorem ipsum dol amet, consectetur adipiscing sum dol amet,
              consectetur adipiscing sum dol amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt.
            </p>
  
            <Date allowReschedule={false} />
            <ButtonsWrapper>
              <Button
                type="primary"
                text="Confirm"
                action={() => alert(1)}
              />
              <Button type="danger" text="Decline" action={() => alert(2)} />
            </ButtonsWrapper>
          </div>
        </Wrapper>
      </>
    );
  };

export default Booking

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
