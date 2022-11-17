import React, {useContext} from 'react'
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import Appointments from './Appointments';
import Bookings from './Bookings';
import Reviews from './Reviews';

const Overview = () => {
  const { userInfo } = useContext(UserContext)

  return (
    <Wrapper>
      <h1>Welcome, {userInfo.username}</h1>

      <Container>
        {
          userInfo.role === 'doctor' &&
          <div className='group'>
            <Bookings />
            <Reviews />
          </div>
        }
        <Appointments />
      </Container>
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

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  

  .group{
    margin-right: 1rem;
  }
  
  @media (max-width: 1200px){
    align-items: center;
    flex-direction: column-reverse;
    
    .group{
      margin-right: 0;
    }
  }
`