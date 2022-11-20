import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-scroll";
import { useNavigate, useLocation } from "react-router-dom";
// Components
import Sidebar from "../Nav/Sidebar";
// Assets
import LogoIcon from "../../assets/svg/Logo";
import BurgerIcon from "../../assets/svg/BurgerIcon";

export default function TopNavbar({ auth }) {
  const [y, setY] = useState(window.scrollY);
  const [sidebarOpen, toggleSidebar] = useState(false);
  
  const navigate = useNavigate()

  const location = useLocation()

  useEffect(() => {
    window.addEventListener("scroll", () => setY(window.scrollY));
    
    return () => window.removeEventListener("scroll", () => setY());
  }, [y]);

  return (
    <>
      <Sidebar
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        auth={auth}
      />
      <Wrapper
        className="flexCenter animate whiteBg"
        style={y > 100 ? { height: "60px" } : { height: "80px" }}
      >
        <NavInner className="container flexSpaceCenter">
          {
            location.pathname === '/' ? (
              <Link className="pointer flexNullCenter" to="home" smooth={true}>
                <LogoIcon />
                <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
                  FindDoc
                </h1>
              </Link>
            ) : (
              <div onClick={() => navigate('/')} className="pointer flexNullCenter">
              <LogoIcon />
              <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
                FindDoc
              </h1>
            </div>
            )
          }
          <BurderWrapper
            className="pointer"
            onClick={() => toggleSidebar(!sidebarOpen)}
          >
            <BurgerIcon />
          </BurderWrapper>

          {!auth && (
            <UlWrapper className="flexNullCenter">
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px 7.5px" }}
                  to="home"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Home
                </Link>
              </li>
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px 7.5px" }}
                  to="service"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Service
                </Link>
              </li>
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px 7.5px" }}
                  to="doctors"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Doctors
                </Link>
              </li>
              <li className="semiBold font15 pointer">
                <Link
                  activeClass="active"
                  style={{ padding: "10px 15px 7.5px" }}
                  to="contact"
                  spy={true}
                  smooth={true}
                  offset={-80}
                >
                  Contact
                </Link>
              </li>
            </UlWrapper>
          )}

          <UlWrapperRight className="flexNullCenter">
            <li className="semiBold font15 pointer" onClick={() => navigate('/auth/login')}>
              <p>
                Log in
              </p>
            </li>
            <li className="semiBold font15 pointer flexCenter" onClick={() => navigate('/auth/register')}>
              <p className="lightBg">
                Register
              </p>
            </li>
          </UlWrapperRight>
        </NavInner>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.nav`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
`;
const NavInner = styled.div`
  position: relative;
  height: 100%;
`;
const BurderWrapper = styled.button`
  outline: none;
  border: 0px;
  background-color: transparent;
  height: 100%;
  padding: 0 15px;
  display: none;
  @media (max-width: 760px) {
    display: block;
  }
`;
const UlWrapper = styled.ul`
  display: flex;
  @media (max-width: 760px) {
    display: none;
  }
`;
const UlWrapperRight = styled.ul`
  p {
    border-radius:10px;         
    padding: .6rem 1.4rem;
    transition: all 0.3s ease;

    &:hover {
      color: #2d59eb;
    }
  }

  @media (max-width: 760px) {
    display: none;
  }
`;
