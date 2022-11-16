import React from 'react'
import styled from "styled-components";
import DoctorsSearch from './DoctorsSearch'
import Doctor from './Doctor'

const Doctors = () => {
  return (
    <div>
      <Header>
        <h1>Doctors</h1>
        <DoctorsSearch />
      </Header>

      <DoctorsList>
        <Doctor 
          title='Kamala Emmanuelle'
          speciality='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
        />
        <Doctor 
          title='Kamala Emmanuelle'
          speciality='Lorem ipsumit ametadipit, d tempor incididunt.por idunt.'
        />
        <Doctor 
          title='Kamala Emmanuelle'
          speciality='Lorem ipsum dol amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.'
        />
        <Doctor 
          title='Kamala Emmanuelle'
          speciality='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunnt.'
        />
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
  
  @media (max-width: 620px){
    margin: 1rem auto;
  }
`