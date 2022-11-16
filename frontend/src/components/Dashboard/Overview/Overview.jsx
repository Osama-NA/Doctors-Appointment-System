import React, {useContext} from 'react'
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import Appointments from './Appointments';

const Overview = () => {
  const { userInfo } = useContext(UserContext)

  return (
    <Wrapper>
      <h1>Welcome, {userInfo.username}</h1>
      <Appointments />
    </Wrapper>
  )
}

export default Overview

const Wrapper = styled.div`
  h1{
    text-align: center;
    font-size: 24px;
  }
  
  @media (max-width: 860px){
    h1{
      font-size: 18px;
    }
  }
`