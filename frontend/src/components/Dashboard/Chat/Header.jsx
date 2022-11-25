import React from "react";
import styled from "styled-components";
import Img from "../../../assets/img/dashboard/profile-img.jpg";

const Header = ({setShowChatTab, appointment, expiryTime}) => {
  return (
    <Wrapper>
      <div className="user">
        <img
          src={
            appointment.user.profileImage ? appointment.user.profileImage : Img
          }
          alt=""
        />
        <div>
          <h3>{appointment.user.username}</h3>
          <p>{expiryTime}</p>
        </div>
      </div>
      <button onClick={() => setShowChatTab(false)}>Leave</button>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #e9f2ff;
  padding: 1rem 1.25rem;

  .user {
    display: flex;
    align-items: center;

    img {
      max-width: 50px;
      min-width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 1rem;
      object-fit: cover;
    }
  }
  button {
    cursor: pointer;
    color: #f95f5f;
    background-color: transparent;
    outline: none;
    border: 1px solid #f95f5f;
    border-radius: 30px;
    padding: 0.5rem 1rem;
    font-size: 14px;
    transition: all 0.2s ease;

    &:hover {
      background-color: #f95f5f;
      color: #fff;
    }
  }

  @media (max-width: 860px) {
    height: 60px;
    padding: .75rem 1rem;

    .user {
      img {
        max-width: 40px;
        min-width: 40px;
        height: 40px;
        margin-right: .75rem;
      }
      h3 {
        font-size: 16px;
        padding-top: .2rem;
      }
    }
    button {
      padding: 0.35rem .85rem;
      font-size: 12px;
    }
  }
`;
