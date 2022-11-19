import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const DoctorsSearch = ({setFilteredDoctors, doctors}) => {
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    let filtered = doctors.filter(doctor => {
      let name = doctor.username.toLowerCase()
      let speciality = doctor.speciality.toLowerCase()
      let input = searchInput.toLowerCase()

      return name.includes(input) || speciality.includes(input)
    })
    
    setFilteredDoctors(filtered)
  }, [doctors, searchInput, setFilteredDoctors])

  return (
    <Wrapper>
      <input
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search doctors"
      />
      <FontAwesomeIcon icon={faMagnifyingGlass} />
    </Wrapper>
  );
};

export default DoctorsSearch;

const Wrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 25px -10px #2525252e;

  input {
    min-width: 250px;
    outline: none;
    border: none;
    font-size: 16px;
    padding: 1rem 1.5rem;
    background-color: transparent;
  }
  svg {
    color: #2d59eb;
    padding-right: 1.5rem;
  }
  
  @media (max-width: 860px){
    display: flex;
    align-items: center;
    border-radius: 7.5px;
    width: 100%;
    max-width: 300px;
  
    input {
      width: 100%;
      min-width: 150px;
      font-size: 12px;
      padding: .75rem 1rem;
    }
    svg {
      font-size: 12px;
      padding-right: 1rem;
    }
  }
  
  @media (max-width: 620px){
    max-width: 375px;
  }
`;
