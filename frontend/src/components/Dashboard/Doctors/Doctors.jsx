import React, {useState, useEffect, useCallback} from 'react'
import styled from "styled-components";
import DoctorsSearch from './DoctorsSearch'
import Doctor from './Doctor'
import { get } from "../../../utils/fetch";

const Doctors = () => {
  const [doctors, setDoctors] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])

  const getDoctors = useCallback(async () => {
    const data = await get(process.env.REACT_APP_API_HOST + "dashboard/doctors")

    if(data.status === 'ok'){
      setDoctors(data.doctors)
    }else{
      alert('Failed to fetch doctors')
    }
  }, [])

  useEffect(() => {
    setFilteredDoctors(doctors)
  }, [doctors])

  useEffect(() => {
    getDoctors()
    
    return () => setDoctors([])
  }, [getDoctors])

  return (
    <div>
      <Header>
        <h1>Doctors</h1>
        <DoctorsSearch doctors={doctors} setFilteredDoctors={setFilteredDoctors} />
      </Header>

      <DoctorsList>
        {
          filteredDoctors.length > 0 ? 
          filteredDoctors.map(doctor => {
            return doctor.speciality && <Doctor 
              key={doctor._id}
              doctor={doctor}
            /> 
          }): <p className="no-results">No results found</p>
        }
      </DoctorsList>
    </div>
  )
}

export default Doctors

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  h1{
    font-size: 24px;
  }

  @media (max-width: 860px){
    h1{
      font-size: 18px;
    }
  }
  @media (max-width: 620px) {
    h1{
      margin-bottom: .25rem;
    }
    flex-direction: column;
  }
`

const DoctorsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin: 1.5rem auto;
  
  .no-results{
    width: 100%;
  }

  @media (max-width: 860px){
    .no-results{
      font-size: 12px;
      text-align: center;
    }
  }
  @media (max-width: 620px){
    margin: 1rem auto;
  }
`