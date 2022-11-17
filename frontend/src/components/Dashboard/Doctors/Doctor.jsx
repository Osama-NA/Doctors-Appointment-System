import React, {useState} from "react";
import styled from "styled-components";
import Button from "../../Buttons/Button";
import Img from "../../../assets/img/dashboard/profile-img.jpg";
import BookAppointment from './BookAppointment'
import Reviews from "../../Elements/Reviews";

const Doctor = ({ speciality, title }) => {
  const [showBookAppointment, setShowBookAppointment] = useState(false)
  const [showReviews, setShowReviews] = useState(false)

  return (
    <>
      <Wrapper>
        <img alt="" src={Img}></img>
        <h2>{title}</h2>
        <p>{speciality}</p>

        <ButtonsWrapper>
          <Button
            type="primary"
            text="Book Appointment"
            action={() => setShowBookAppointment(true)}
          />
          <Button type="secondary" text="Reviews" action={() => setShowReviews(true)} />
        </ButtonsWrapper>
      </Wrapper>

      {
        showBookAppointment &&
        <BookAppointment  
          setShow={setShowBookAppointment}
        />
      }
      {
        showReviews &&
        <Reviews 
          setShowReviews={setShowReviews}
          name={title}
          reviews={[{}, {}]}
        />
      }
    </>
  );
};

export default Doctor;

const Wrapper = styled.li`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 1.25rem 1.5rem;
  box-shadow: 0 5px 25px -10px #2525252e;
  background-color: #fff;
  width: 24vw;
  max-width: 450px;
  margin-right: 1rem;
  margin-bottom: 1rem;

  img {
    border-radius: 50%;
    width: 75px;
    height: 75px;
    box-shadow: 0 3px 20px -12px rgb(0 0 0 / 0.125);
  }

  h2 {
    font-size: 22px;
    line-height: 26px;
    margin-top: 1.25rem;
  }
  p {
    line-height: 20px;
    height: 100%;
    margin: 0.25rem 0 1.25rem;
  }

  @media (max-width: 1440px) {
    width: 35vw;
    max-width: 400px;
  }

  @media (max-width: 1190px) {
    width: 32vw;
  }

  @media (max-width: 1070px) {
    width: 100vw;
    max-width: 500px;
  }

  @media (max-width: 860px) {
    border-radius: 10px;
    padding: 1rem 1.25rem;
    width: 44vw;
    max-width: 375px;
    margin-right: 0.75rem;
    margin-bottom: 0.75rem;

    img {
      width: 60px;
      height: 60px;
    }
    h2 {
      font-size: 18px;
      line-height: 22px;
      margin-top: 1rem;
    }
    p {
      font-size: 12px;
      line-height: 16px;
      margin: 0.15rem 0 0.75rem;
    }
  }

  @media (max-width: 620px) {
    width: 100%;
    max-width: 375px;
    margin: 0.5rem auto;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-self: flex-end;

  button:nth-child(1) {
    margin-right: 0.5rem;
  }
  
  @media (max-width: 860px){
    button:nth-child(1) {
      margin-right: 0.35rem;
    }
  }
`;
