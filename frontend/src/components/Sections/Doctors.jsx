import React from "react";
import styled from "styled-components";
// Components
import DoctorBox from "../Elements/DoctorBox";
// Assets
import DoctorOne from '../../assets/img/doctors/1.jpg'
import DoctorTwo from '../../assets/img/doctors/2.jpg'
import DoctorThree from '../../assets/img/doctors/3.jpg'

export default function Doctors() {
  return (
    <Wrapper id="doctors" className="container">
      <HeaderInfo>
        <h1 className="font40 extraBold">Some of the doctors</h1>
        <p className="font13">
          Find a doctor, book a visit and solve any health-related doubt. Log in to your account to find more doctors.
        </p>
      </HeaderInfo>
      
      <DoctorsWrapper className="flexWrap row">
        <DoctorWrapper>
          <DoctorBox
            img={DoctorOne}
            name="Dr. Marcelle Pavle"
            speciality="Aesthetic And Reconstructive Surgery, Maxillofacial Surgery and Implantology"
          />
        </DoctorWrapper>
        <DoctorWrapper>
          <DoctorBox
            img={DoctorTwo}
            name="Dr. Kirabo Sullivan"
            speciality="Dental Care, Orthodontics & Dentofacial Orthopaedics"
          />
        </DoctorWrapper>
        <DoctorWrapper>
          <DoctorBox
            img={DoctorThree}
            name="Dr. Radha Mariyam"
            speciality="Endocrinology & Diabetes, Internal Medicine"
          />
        </DoctorWrapper>
      </DoctorsWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  padding-bottom: 6rem;
  @media (max-width: 980px) {
    padding-bottom: 4rem;
  }
`;
const HeaderInfo = styled.div`
  padding-bottom: 25px;
  @media (max-width: 860px) {
    p{
      margin: 0 auto;
      max-width: 400px;
      padding: 0 1rem;
    }
    text-align: center;
  }
`;
const DoctorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0 1rem;
  @media (max-width: 860px) {
    align-items: center;
    flex-direction: column;
  }
`
const DoctorWrapper = styled.div`
  display: flex;
  width: 31.5%;
  margin-right: 1.5%;

  @media (max-width: 980px) {
    width: 47.5%;
    margin-right: 2.5%;
    margin-bottom: 2.5%;
  }
  @media (max-width: 860px) {
    width: 400px;
    margin-right: 0;
    margin-bottom: 2.5%;
  }
  @media (max-width: 475px) {
    margin-bottom: 5%;
    width: 100%;
  }
`