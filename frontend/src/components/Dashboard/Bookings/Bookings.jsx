import React, { useState, useEffect, useCallback, useContext } from "react";
import styled from "styled-components";
import Booking from "./Booking";
import { UserContext } from "../../../context/User";
import { post, get } from "../../../utils/fetch";
import SuccessMessage from "../../Elements/SuccessMessage";
import Loader from "../../Elements/Loader";

const Bookings = () => {
  const { userInfo } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const getBookings = useCallback(async () => {
    const data = await get(
      process.env.REACT_APP_API_HOST +
        "dashboard/bookings?id=" +
        userInfo._id +
        "&role=" +
        userInfo.role
    );

    if (data.status === "ok") {
      setBookings(data.bookings);
    } else {
      alert("Failed to fetch bookings");
    }
  }, [userInfo._id, userInfo.role]);

  const confirmBooking = async (bookingId) => {
    setLoading(true)

    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/confirm-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: bookingId,
      }
    );

    setLoading(false)

    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage("Booking successfully confirmed");
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  const cancelBooking = async (bookingId) => {
    setLoading(true)

    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/delete-appointment",
      {
        token: localStorage.getItem("token"),
        appointment_id: bookingId,
      }
    );

    setLoading(false)
    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setSuccessMessage(
        `Booking successfully ${
          userInfo.role === "patient" ? "canceled" : "declined"
        }`
      );
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
  };

  useEffect(() => {
    getBookings();

    return () => setBookings([]);
  }, [getBookings, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Bookings</h1>

        <Container itemsLength={bookings.length}>
          {bookings.length > 0 ? (
            bookings.map((booking) => {
              return (
                <Booking
                  key={booking._id}
                  booking={booking}
                  confirmBooking={() => confirmBooking(booking._id)}
                  cancelBooking={() => cancelBooking(booking._id)}
                  role={userInfo.role}
                />
              );
            })
          ) : (
            <p className="no-results">No bookings found</p>
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
    </>
  );
};
export default Bookings;

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
  max-width: 600px;
  min-height: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  .booking:nth-child(1) {
    padding: 0.25rem 0 1.5rem;
  }
  .booking:nth-child(${({itemsLength}) => itemsLength}) {
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