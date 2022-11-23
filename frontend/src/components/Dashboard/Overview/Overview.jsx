import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import Appointments from "./Appointments";
import Bookings from "./Bookings";
import Reviews from "./Reviews";
import { post, get } from "../../../utils/fetch";
import { ProgressBar } from "react-loader-spinner";
import SuccessMessage from "../../Elements/SuccessMessage";
import ChatTab from "../Chat/ChatTab";

const defaultContent = {
  bookings: [],
  appointments: [],
};

const Overview = () => {
  const { userInfo } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [content, setContent] = useState(defaultContent);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [channelId, setChannelId] = useState("");
  const [showChatTab, setShowChatTab] = useState(false);
  const [appointmentData, setAppointmentData] = useState({})

  const confirmBooking = async (bookingId) => {
    setLoading(true);

    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/confirm-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: bookingId,
      }
    );

    setLoading(false);

    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Booking successfully confirmed");
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  const handleJoinAppointment = (appointmentId) => {
    setChannelId(appointmentId);
    setShowChatTab(true);
  };

  const getContent = useCallback(async () => {
    const data = await get(
      process.env.REACT_APP_API_HOST +
        "dashboard/overview?id=" +
        userInfo._id +
        "&role=" +
        userInfo.role
    );

    if (data.status === "ok") {
      setContent({
        bookings: data.content.bookings.filter((item, index) => index < 3),
        appointments: data.content.appointments.filter(
          (item, index) => index < 9
        ),
      });
    } else {
      alert("Failed to fetch content");
    }
  }, [userInfo._id, userInfo.role]);

  useEffect(() => {
    getContent();

    return () => setContent(defaultContent);
  }, [getContent, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Welcome, {userInfo.username}</h1>

        <Container>
          {userInfo.role === "patient" ? (
            <div className="patient-bookings">
              <Bookings
                bookings={content.bookings}
                confirmBooking={confirmBooking}
                role="patient"
              />
            </div>
          ) : (
            <div className="group">
              <Bookings
                bookings={content.bookings}
                confirmBooking={confirmBooking}
                role="doctor"
              />
              <Reviews />
            </div>
          )}
          <Appointments
            appointments={content.appointments}
            handleJoinAppointment={handleJoinAppointment}
            setAppointment={setAppointmentData}
          />

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

export default Overview;

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
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;

  .patient-bookings {
    margin-right: 1rem;
  }
  .group {
    margin-right: 1rem;
  }

  @media (max-width: 1200px) {
    align-items: center;
    flex-direction: column-reverse;

    .group,
    .patient-bookings {
      margin-right: 0;
    }
  }

  @media (max-width: 860px) {
    .patient-bookings {
      width: 100%;
    }
  }
`;

const Loader = styled.div`
  position: absolute;
  bottom: -4.5rem;
  left: 47.5%;

  @media (max-width: 1200px) {
    bottom: -4rem;
    left: 44%;
  }
  @media (max-width: 860px) {
    bottom: -4rem;
  }
  @media (max-width: 460px) {
    left: 40%;
  }
`;
