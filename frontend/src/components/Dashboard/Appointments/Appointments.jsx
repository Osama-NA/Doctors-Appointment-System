import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Appointment from "./Appointment";
import { UserContext } from "../../../context/User";
import { post, get } from "../../../utils/fetch";
import SuccessMessage from "../../Elements/SuccessMessage";
import Loader from "../../Elements/Loader";
import ChatTab from "../Chat/ChatTab";

const Appointments = () => {
  const { userInfo } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [showChatTab, setShowChatTab] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [rescheduledDate, setRescheduledDate] = useState();
  const [successMessage, setSuccessMessage] = useState("");
  const [channelId, setChannelId] = useState("");
  const [appointmentData, setAppointmentData] = useState({})

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

  const handleJoinAppointment = (appointmentId) => {
    setChannelId(appointmentId);
    setShowChatTab(true);
  };
  
  const cancelAppointment = async (appointmentId) => {
    setLoading(true)

    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/delete-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: appointmentId,
      }
    );

    setLoading(false)

    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Appointment successfully canceled");
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  const autoCancelAppointment = async (appointmentId) => {
    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/delete-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: appointmentId,
      }
    );

    if (data.status === "ok") {
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  }

  const rescheduleAppointment = async (appointmentId) => {
    setLoading(true)

    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/reschedule-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: appointmentId,
        date: rescheduledDate
      }
    );

    setLoading(false)

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
      <Wrapper >
        <h1>Scheduled Appointments</h1>

        <Container itemsLength={appointments.length}>
          {appointments.length > 0 ? (
            appointments.map((appointment) => {
              return (
                <Appointment
                  key={appointment._id}
                  appointment={appointment}
                  cancelAppointment={() => cancelAppointment(appointment._id)}
                  role={userInfo.role}
                  setRescheduledDate={setRescheduledDate}
                  rescheduleAppointment={() => rescheduleAppointment(appointment._id)}
                  rescheduledDate={rescheduledDate}
                  handleJoinAppointment={handleJoinAppointment}
                  setAppointment={setAppointmentData}
                  autoCancelAppointment={() => autoCancelAppointment(appointment._id)}
                />
              );
            })
          ) : (
            <p className="no-results">No appointments found</p>
          )}
          
          <Loader visible={loading} />
        </Container>
      </Wrapper>
      
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message={successMessage}
        />
      )}
      {showChatTab && (
        <ChatTab channelId={channelId} setShowChatTab={setShowChatTab} appointment={appointmentData} />
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
  .appointment:nth-child(${({itemsLength}) => itemsLength}) {
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