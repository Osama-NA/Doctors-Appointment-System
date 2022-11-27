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
import ReviewTab from "../../Elements/ReviewTab";
import { getFormatedDate, isAppointmentDate } from "../../../utils/date";

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
  const [appointment, setAppointment] = useState({});
  const [showReviewTab, setShowReviewTab] = useState(false);

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
  };

  const joinAppointment = (appointment) => {
    let didAppointmentStart = isAppointmentDate(appointment);
    if (!didAppointmentStart.status) {
      if (didAppointmentStart.message === "early") {
        alert("You can not join before " + appointment.date);
      }
      if (didAppointmentStart.message === "finished") {
        let expiryTime = getFormatedDate(
          didAppointmentStart.expiryTime.toString()
        );
        alert("Session finished at " + expiryTime);
        autoCancelAppointment(appointment._id);
      }
      return;
    }

    setAppointment(appointment);
    handleJoinAppointment(appointment._id);
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
      let userContent =
        userInfo.role === "doctor"
          ? {
              bookings: data.content.bookings.filter(
                (item, index) => index < 3
              ),
              appointments: data.content.appointments.filter(
                (item, index) => index < 9
              ),
              reviews: data.content.reviews.filter((item, index) => index < 2),
            }
          : {
              bookings: data.content.bookings.filter(
                (item, index) => index < 3
              ),
              appointments: data.content.appointments.filter(
                (item, index) => index < 9
              ),
            };

      setContent(userContent);
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
              <Reviews reviews={content.reviews} />
            </div>
          )}
          <Appointments
            appointments={content.appointments}
            handleJoinAppointment={handleJoinAppointment}
            setAppointment={setAppointment}
            autoCancelAppointment={autoCancelAppointment}
            joinAppointment={joinAppointment}
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
        <ChatTab
          channelId={channelId}
          setShowChatTab={setShowChatTab}
          appointment={appointment}
          setShowReviewTab={setShowReviewTab}
          autoCancelAppointment={autoCancelAppointment}
        />
      )}
      {showReviewTab && (
        <ReviewTab
          setShow={setShowReviewTab}
          appointment={appointment}
          setRefresh={setRefresh}
          refresh={refresh}
        />
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
    .patient-bookings,
    .group {
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
