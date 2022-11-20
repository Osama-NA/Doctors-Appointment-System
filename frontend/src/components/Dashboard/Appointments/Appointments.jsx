import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Appointment from "./Appointment";
import { UserContext } from "../../../context/User";
import { post, get } from "../../../utils/fetch";
import SuccessMessage from "../../Elements/SuccessMessage";

const Appointments = () => {
  const { userInfo } = useContext(UserContext);

  const [refresh, setRefresh] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [rescheduledDate, setRescheduledDate] = useState();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const getAppointmens = useCallback(async () => {
    const data = await get(
      process.env.REACT_APP_API_HOST +
        "dashboard/appointments?id=" +
        userInfo._id +
        "&role=" +
        userInfo.role
    );

    if (data.status === "ok") {
      setAppointments(data.appointments);
    } else {
      alert("Failed to fetch appointments");
    }
  }, [userInfo._id, userInfo.role]);

  useEffect(() => {
    getAppointmens();

    return () => setAppointments([]);
  }, [getAppointmens, refresh]);

  const cancelAppointment = async (appointmentId) => {
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/delete-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: appointmentId,
      }
    );

    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Appointment successfully canceled");
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  const rescheduleAppointment = async (appointmentId) => {
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/reschedule-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: appointmentId,
        date: rescheduledDate
      }
    );

    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Appointment successfully rescheduled");
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <Wrapper>
        <h1>Appointments</h1>

        <Container>
          {appointments.length > 0 ? (
            appointments.map((appointment) => {
              return (
                <Appointment
                  key={appointment._id}
                  appointment={appointment}
                  cancelBooking={() => cancelAppointment(appointment._id)}
                  role={userInfo.role}
                  setRescheduledDate={setRescheduledDate}
                  rescheduleAppointment={() => rescheduleAppointment(appointment._id)}
                  rescheduledDate={rescheduledDate}
                />
              );
            })
          ) : (
            <p className="no-results">No recent appointments found</p>
          )}
        </Container>
      </Wrapper>
      
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message={successMessage}
        />
      )}
    </>
  );
};

export default Appointments;

const Wrapper = styled.div`
  h1 {
    text-align: center;
    font-size: 24px;
  }

  @media (max-width: 860px) {
    h1 {
      font-size: 18px;
    }
  }
`;
const Container = styled.div`
  width: 100%;
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .appointment:nth-child(1) {
    padding: 0.25rem 0 1.5rem;
  }
  .appointment:nth-last-child(1) {
    border-bottom: none;
  }
  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    .no-results {
      font-size: 12px;
    }
  }
`;
