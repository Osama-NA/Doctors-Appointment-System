import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "../../Buttons/Button";

const BookAppointment = ({ setShow }) => {
  const [date, setDate] = useState();
  const [message, setMessage] = useState();

  useEffect(() => {
    console.log(date?.format('MMMM Do YYYY, h:mm:ss a'));
    console.log(date?._d);
  }, [date]);

  return (
    <Wrapper>
      <CloseOverlay onClick={() => setShow(false)}></CloseOverlay>

      <Container>
        <label>What do you need help with?</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} required />
        <label>Select appointment date</label>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
        <Buttons>
            <Button 
                text='Cancel'
                type='secondary'
                action={() => setShow(false)}
            />
            <Button 
                text='Confirm Booking'
                type='primary'
                action={() => alert('Booking')}
            />
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default BookAppointment;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #0b15361f;
  display: grid;
  place-items: center;
  padding: 0 1.5rem;
`;

const CloseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Container = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;

  label {
    font-weight: 600;
  }
  textarea {
    background-color: #eceff5;
    border: none;
    outline: none;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 1.25rem;
    resize: vertical;
    max-height: 200px;
    min-height: 50px;
  }
  
  @media (max-width: 860px) {
    width: 100%;
    max-width: 300px;
    padding: 1rem 1.25rem;
  
    label {
        font-size: 12px;
    }
    textarea {
        padding: .6rem 1rem;
      font-size: 12px;
      margin-bottom: 1rem;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;

  .secondary{
    margin-right: .5rem;
  }
`