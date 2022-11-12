import React, {useState, useContext} from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router-dom";
import SideNavbar from "./SideNavbar";
// Assets
import LogoIcon from "../../../assets/svg/Logo";
import DefaultProfilePicture from "../../../assets/img/dashboard/profile-img.jpg";

const TopNavbar = () => {
  const navigate = useNavigate()

  const { setUserInfo, userInfo } = useContext(UserContext)

  const [showMenu, setShowMenu] = useState(false)

  const signOut = () => {
    localStorage.clear()
    setUserInfo({})
    navigate('/')
  }

  return (
    <Wrapper>
      <Logo>
        <div onClick={() => navigate("/dashboard")}>
          <LogoIcon />
          <h1 style={{ marginLeft: "15px" }} className="font20 extraBold">
            FindDoc
          </h1>
        </div>
      </Logo>

      <User>
        <div className="menu-btn" onClick={() => setShowMenu(!showMenu)}>
          <FontAwesomeIcon icon={showMenu ? faXmark : faBars} />
        </div>

        <div className="username">
          <h2>{userInfo.username}</h2>
          <p onClick={() => signOut()}>Sign out</p>
        </div>

        <div className="image">
          <img src={
            userInfo.profileImage ? userInfo.profileImage : DefaultProfilePicture
          } alt="" />
        </div>
      </User>

      <SideNavbar
        username={userInfo.username}
        showMenu={showMenu}
        setShowMenu={setShowMenu}
        signOut={signOut}
      />
    </Wrapper>
  );
};

export default TopNavbar;

const Wrapper = styled.header`
  position: fixed;
  top: 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 0;
  
  @media (max-width: 860px){
    background-color: #fff;
  }
`;

const Logo = styled.div`
  width: 275px;
  background-color: #fff;
  padding: 2rem;
  z-index: 2;

  div {
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  @media (max-width: 860px){
    width: auto;
    background-color: transparent;
    padding: 1rem 1.5rem;
  }
`;

const User = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 0.75rem 0.75rem 1.25rem;
  margin: 0rem 0.75rem;
  background-color: #fff;
  border-radius: 10px;
  z-index: 2;

  .menu-btn{
    display: none;
  }
  .username {
    padding-right: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;

    h2 {
      font-size: 20px;
      line-height: 0;
      padding: 0.6rem 0 1.5rem;
    }
    p {
      cursor: pointer;
      line-height: 0;
      font-weight: 600;
      color: #2d59eb;
    }
  }
  .image {
    width: 60px;
    min-width: 60px;
    height: 60px;
    overflow: hidden;
    border-radius: 50%;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @media (max-width: 860px){
    justify-content: flex-end;
    padding: 0;
    margin: 0rem 1.5rem;
    background-color: transparent;
    min-width: 80px;
  
    .menu-btn{
      cursor: pointer;
      display: grid;
      place-items: center;
      margin: 0 1rem;

      svg{
        font-size: 19px;
      }
    }
    .username {
      display: none;
    }
    .image {
      min-width: 50px;
      width: 50px;
      height: 50px;
    }
  }
`;
 