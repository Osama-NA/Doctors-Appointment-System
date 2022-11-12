import React from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
// Assets
import LogoImg from "../../assets/svg/Logo";

export default function Contact() {

  const navigate = useNavigate()

  const location = useLocation()

  const getCurrentYear = () => {
    return new Date().getFullYear();
  }
  
  return (
    <Wrapper>
      <div className="darkBg">
        <div className="container">
          <InnerWrapper className="flexSpaceCenter" style={{ padding: "30px 0" }}>
            {
              location.pathname === '/' ? (
                <Link className="flexCenter animate pointer" to="home" smooth={true} offset={-80}>
              <LogoImg />
              <h1 className="font15 extraBold whiteColor" style={{ marginLeft: "15px" }}>
                FindDoc
              </h1>
            </Link>
              ) : (
                <div onClick={() => navigate('/')} className="flexCenter animate pointer">
                  <LogoImg />
                  <h1 className="font15 extraBold whiteColor" style={{ marginLeft: "15px" }}>
                    FindDoc
                  </h1>
                </div>
              )
            }
            
            <StyleP className="whiteColor font13">
              © {getCurrentYear()} - <span className="purpleColor font13">FindDoc</span> All Right Reserved
            </StyleP>

            {
              location.pathname === '/' &&  
              <Link className="whiteColor animate pointer font13" to="home" smooth={true} offset={-80}>
                Back to top
              </Link>
            }
          </InnerWrapper>
        </div>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
`;
const InnerWrapper = styled.div`
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
const StyleP = styled.p`
  @media (max-width: 550px) {
    margin: 20px 0;
  }
`;