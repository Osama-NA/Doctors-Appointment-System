import React from "react";
import styled from "styled-components";
// Assets
import ContactImg1 from "../../assets/img/contact/1.png";
import ContactImg2 from "../../assets/img/contact/2.png";
import ContactImg3 from "../../assets/img/contact/3.png";

export default function Contact() {
  return (
    <Wrapper id="contact">
      <div className="lightBg">
        <div className="container">
          <HeaderInfo>
            <h1 className="font40 extraBold">We're here to help.</h1>
            <p className="font13">
              Get in touch with us by submitting the form below and we will get back to you soon.
            </p>
          </HeaderInfo>
          <div className="row" style={{ paddingBottom: "60px" }}>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
              <Form>
                <label className="font13">First name:</label>
                <input type="text" id="fname" name="fname" />
                <label className="font13">Email:</label>
                <input type="text" id="email" name="email"  />
                <label className="font13">Subject:</label>
                <input type="text" id="subject" name="subject"  />
                <label className="font13">Message:</label>
                <textarea rows="4" cols="50" type="text" id="message" name="message"/>
              </Form>
              <SumbitWrapper>
                <ButtonInput type="submit" value="Send Message" className="pointer animate radius8"  />
              </SumbitWrapper>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 flex images">
              <div style={{ width: "50%" }} className="flexNullCenter flexColumn">
                <ContactImgBox>
                  <img src={ContactImg1} alt="office" className="radius6" />
                </ContactImgBox>
                <ContactImgBox>
                  <img src={ContactImg2} alt="office" className="radius6" />
                </ContactImgBox>
              </div>
              <div style={{ width: "50%" }}>
                <div style={{ marginTop: "100px" }}>
                  <img src={ContactImg3} alt="office" className="radius6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  
  @media (max-width: 991px) {
    .images{
      display: none;
    }
  }
`;
const HeaderInfo = styled.div`
  padding: 70px 0 0;
  p{
    max-width: 500px;
  }
  @media (max-width: 860px) {
    text-align: center;
    p{
      margin: 0 auto;
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 25px 0;
  label{
    width: 100%;
    max-width: 500px;
    font-weight: 600;
  }
  input,
  textarea {
    font-size: 14px;
    font-weight: 400;
    width: 100%;
    max-width: 500px;
    background-color: transparent;
    border: 0px;
    outline: none;
    box-shadow: none;
    border-bottom: 2px solid #707070;
    height: 30px;
    margin-bottom: 30px;
  }
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  @media (max-width: 860px) {
    padding: 30px 0 10px;
    align-items: center;
  }
`;
const ButtonInput = styled.input`
border: 1px solid #2d59eb;
background-color: #2d59eb;
padding: .8rem 1.4rem;
outline: none;         
border-radius:10px;                                                                                                                                                                                                                
color: #fff; 

:hover {
  background-color: #2248c5;
  border: 1px solid #2248c5;
}

@media (max-width: 860px){
  font-size: 12px;
  padding: .7rem 1.2rem;
  outline: none;         
}
`;
const ContactImgBox = styled.div`
  max-width: 180px; 
  align-self: flex-end; 
  margin: 10px 30px 10px 0;
`;
const SumbitWrapper = styled.div`
  @media (max-width: 991px) {
    margin-bottom: 20px;
  }
  @media (max-width: 860px) {
    display: flex;
    justify-content: center;
  }
`;









