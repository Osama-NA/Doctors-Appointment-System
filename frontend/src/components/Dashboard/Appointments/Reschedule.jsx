import React, { useState } from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "../../Buttons/Button";

const Reschedule = ({ setShow }) => {
  const [date, setDate] = useState();

  return (
    <Wrapper>
      <CloseOverlay onClick={() => setShow(false)}></CloseOverlay>

      <Container>
        <label>Select appointment date</label>
        <DateTimePicker
          renderInput={(props) => <TextField {...props} />}
          value={date}
          onChange={(newValue) => setDate(newValue)}
        />
        <Buttons>
          <Button
            text="Cancel"
            type="secondary"
            action={() => setShow(false)}
          />
          <Button
            text="Reschedule"
            type="primary"
            action={() => alert("Reschedule")}
          />
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default Reschedule;

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
  background-color: #0e1a4338;
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

  @media (max-width: 860px) {
    width: 100%;
    max-width: 300px;
    padding: 1rem 1.25rem;

    label {
      font-size: 12px;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1.25rem;

  .secondary {
    margin-right: 0.5rem;
  }
`;
