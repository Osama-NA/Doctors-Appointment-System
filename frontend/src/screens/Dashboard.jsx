import React, {useEffect, useContext, useState, useCallback} from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "../context/User";
import jwt from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import { get } from "../utils/fetch";

import TopNavbar from '../components/Dashboard/Nav/TopNavbar';
import Patient from '../components/Dashboard/Patient';
import Doctor from '../components/Dashboard/Doctor';

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
      navigate(`/dashboard/${data.user.role}`)
    }

    navigate(`/dashboard/${userInfo.role}`)
  }, [navigate, setUserInfo, userInfo.id, userInfo.role, userInfo.token])

  useEffect(() => {
    if(!isAuthenticatedUser()){
      navigate('/auth/login')
    }

    getUserData()
  }, [getUserData, isAuthenticatedUser, navigate, userInfo.token])

  return (
    <Wrapper>
      <TopNavbar />
      <Routes>
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctor" element={<Doctor />} />
      </Routes>
    </Wrapper>
  )
}

export default Dashboard

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  min-height: 100vh;
  background-color: #ECEFF5;
  z-index: 0;
`