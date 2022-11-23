import React, {useEffect, useContext, useCallback} from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../context/User";
import jwt from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { get } from "../utils/fetch";
import PubNub from 'pubnub';
import { PubNubProvider } from 'pubnub-react';

import TopNavbar from '../components/Dashboard/Nav/TopNavbar';
import Patient from '../components/Dashboard/Patient';
import Doctor from '../components/Dashboard/Doctor';

const pubnub = new PubNub({
  publishKey: process.env.REACT_APP_PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.REACT_APP_PUBNUB_SUBSCRIBE_KEY,
  uuid: process.env.REACT_APP_PUBNUB_UNIQUE_ID
});

const Dashboard = () => {
  const navigate = useNavigate()

  const { userInfo, setUserInfo } = useContext(UserContext)

  const isAuthenticatedUser =useCallback(() => {
    const token = localStorage.getItem('token')

    if(userInfo.token === undefined && (!token || token === 'undefined')){
      navigate('/auth/login')
    }

    try{
      jwt(token)
      return true
    }catch(error){
      localStorage.removeItem('token');
      alert('Authenticated access only, please sign in.');
      return false
    }
  }, [navigate, userInfo.token]) 
  
  const getUserData =  useCallback(async () => {
    const id = userInfo.id || localStorage.getItem('id')

    if(!id || id === 'undefined'){
      navigate('/auth/login')
    }

    if(userInfo.token === undefined){
      const data = await get(process.env.REACT_APP_API_HOST + "dashboard/user?id="+ id)

      if(data.status === 'error'){
        alert('Failed to get user data. Please login again.')
        navigate('/auth/login')
      }
      
      setUserInfo(data.user)
    }
  }, [navigate, setUserInfo, userInfo.id, userInfo.token])

  useEffect(() => {
    if(!isAuthenticatedUser()){
      navigate('/auth/login')
    }

    getUserData()
  }, [getUserData, isAuthenticatedUser, navigate, userInfo.token])

  return (
    <PubNubProvider client={pubnub}>
      <Wrapper>
        <TopNavbar />
        <Routes>
            <Route path="/patient/*" element={<Patient />} />
            <Route path="/doctor/*" element={<Doctor />} />
        </Routes>
      </Wrapper>
    </PubNubProvider>
  )
}

export default Dashboard

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: #ECEFF5;
  z-index: 0;

  .pages-wrapper{
    width: 100%;
    padding: 140px 2.5rem 135px 310px;
    z-index: 1;
  }

  @media (max-width: 860px){
    .pages-wrapper{
      padding: 115px 1.5rem;
    }
  }
`