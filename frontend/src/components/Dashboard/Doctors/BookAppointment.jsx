import React, { useState, useContext} from "react";
import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Button from "../../Buttons/Button";
import { UserContext } from "../../../context/User";
import { ProgressBar } from "react-loader-spinner";
import { post } from "../../../utils/fetch";
import SuccessMessage from '../../Elements/SuccessMessage'
import { getFormatedDate, isAppointmentDate } from "../../../utils/date";


const BookAppointment = ({ setShow, doctorId }) => {
  const { userInfo } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [date, setDate] = useState(null);
  const [message, setMessage] = useState();
  const [displayedDate, setDisplayedDate] = useState()

  const handleBooking = () => {
    if(!date || !message){
      alert('Please fill in the required fields')
      return
    }

    let formatedDate = date._d.toString()

    if(formatedDate === 'Invalid Date'){
      alert('Please select a valid date')
      return
    }

    formatedDate = getFormatedDate(formatedDate)

    let isAvailableDate = isAppointmentDate({date: formatedDate})
    
    if(isAvailableDate.message !== 'early'){
      alert('Please select an available date and time')
      return
    }

    bookAppointment(formatedDate)
  }

  const bookAppointment = async (formatedDate) => {
    setLoading(true)
    
    const data = await post(process.env.REACT_APP_API_HOST + "dashboard/book-appointment", {
      reason: message,
      date: formatedDate,
      bookedDoctor: doctorId,
      bookedBy: userInfo._id
    })
    
    setLoading(false)
    setMessage('')
    setDate(null)

    if(data.status === 'ok'){
      setDisplayedDate(formatedDate)
      setShowSuccessMessage(true)
    }else{
      alert(data.error)
    }
  }

  return (
    <>
    <Wrapper>
      <CloseOverlay onClick={() => setShow(false)}></CloseOverlay>

      <Container>
        <label>What do you need help with?</label>
        <textarea value={message} onChange={e => setMessage(e.target.value)} required />
        <label>Select appointment date</label>
        <DateTimePicker
          renderInput={(props) => <TextField {...props}  />}
          value={date}
          minDate={new Date()}
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
                action={handleBooking}
            />
        </Buttons>

        <Loader>
          <ProgressBar
            height="60"
            visible={loading}
            borderColor="#000"
            barColor="#2d59eb"
          />
        </Loader>
      </Container>
    </Wrapper>

    {
      showSuccessMessage&&
      <SuccessMessage 
        setShow={setShow}
        message={'Appointment successfully booked at ' + displayedDate}
      />
    }
    </>
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
  position: relative;
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

const Loader = styled.div`
  position: absolute;
  bottom: -4.5rem;
  left: 44%;
  
  @media (max-width: 860px){
    bottom: -4rem;
    left: 38%;
  }
  @media (max-width: 460px){
    left: 36%;
  }
`