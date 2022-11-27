import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Img from "../../../assets/img/dashboard/profile-img.jpg";
import Button from "../../Buttons/Button";
import Reschedule from "./Reschedule";
import Date from "./Date";
import ConfirmTab from "../../Elements/ConfirmTab";
import { getFormatedDate, isAppointmentDate } from "../../../utils/date";

const Appointment = ({
  appointment,
  cancelAppointment,
  role,
  setRescheduledDate,
  rescheduleAppointment,
  rescheduledDate,
  joinAppointment,
  autoCancelAppointment,
}) => {
  const [showRescheduleAppointment, setShowRescheduleAppointment] =
    useState(false);

  const [showConfirmCancel, setShowConfirmCancel] = useState(false);
  const [confirmCancelMessage, setConfirmCancelMessage] = useState("");
  const [appointmentStatus, setAppointmentStatus] = useState("");
  const [expiryTime, setExpiryTime] = useState();

  const handleCancelAppointment = () => {
    setShowConfirmCancel(true);
    setConfirmCancelMessage(`
      Are you sure you want to ${
        role === "patient" ? "cancel" : "decline"
      } this appointment with ${appointment.user.username}, at ${
      appointment.date
    }?
    `);
  };

  useEffect(() => {
    let didAppointmentStart = isAppointmentDate(appointment);
    setAppointmentStatus(didAppointmentStart.message);
    if (!didAppointmentStart.status) return;

    setExpiryTime(getFormatedDate(didAppointmentStart.expiryTime));
  }, [appointment]);

  return (
    <>
      <Wrapper className="appointment">
        <img
          src={
            appointment.user.profileImage ? appointment.user.profileImage : Img
          }
          alt=""
        />

        <div className="info">
          <h2>{appointment.user.username}</h2>
          <p>Appointment reason: {appointment.reason}</p>

          {appointmentStatus === "joined" ? (
            <>
              <p className="started">Appointment started</p>
              <p className="finish">Ends at {expiryTime}</p>
            </>
          ) : appointmentStatus === "finished" ? (
            <p className="finish">Session ended</p>
          ) : (
            <Date
              setRescheduledDate={setRescheduledDate}
              date={appointment.date}
              setShowRescheduleAppointment={setShowRescheduleAppointment}
              allowReschedule={true}
            />
          )}
          <ButtonsWrapper>
            {appointmentStatus === "early" ? (
              <Button
                type="danger"
                text="Cancel Appointment"
                action={handleCancelAppointment}
              />
            ) : appointmentStatus === "finished" ? (
              <Button
                type="danger"
                text="Delete Appointment"
                action={() => autoCancelAppointment(appointment._id)}
              />
            ) : (
              <Button
                type="primary"
                text="Join Appointment"
                action={() => joinAppointment(appointment)}
              />
            )}
          </ButtonsWrapper>
        </div>
      </Wrapper>

      {showRescheduleAppointment && (
        <Reschedule
          setRescheduledDate={setRescheduledDate}
          setShow={setShowRescheduleAppointment}
          rescheduleAppointment={() => rescheduleAppointment(appointment._id)}
          rescheduledDate={rescheduledDate}
        />
      )}
      {showConfirmCancel && (
        <ConfirmTab
          setShow={setShowConfirmCancel}
          promptText={confirmCancelMessage}
          type="danger"
          cta="Yes"
          action={() => cancelAppointment(appointment._id)}
          cancelText="No"
        />
      )}
    </>
  );
};

export default Appointment;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d1d1d1;
  padding: 1.5rem 0;

  img {
    border-radius: 50%;
    max-width: 75px;
    min-width: 75px;
    height: 75px;
    object-fit: cover;
  }

  .info {
    width: 100%;
    padding-left: 1.5rem;

    h2 {
      font-size: 22px;
      line-height: 26px;
      margin-top: 0.75rem;
    }
    p {
      line-height: 20px;
      margin: 0.25rem 0;
    }
    .started,
    .finish {
      font-weight: 600;
    }
    .started {
      color: #2d59eb;
    }
    .finish {
      color: #f95f5f;
      margin: 0 0 1rem;
    }
  }

  @media (max-width: 860px) {
    padding: 1.25rem 0;
    flex-direction: column;

    img {
      max-width: 60px;
      min-width: 60px;
      height: 60px;
    }

    .info {
      padding-left: 0;
      padding-top: 0.5rem;

      h2 {
        font-size: 16px;
        line-height: 20px;
      }
      p {
        font-size: 12px;
        line-height: 16px;
      }
    }
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-self: flex-end;

  button {
    min-width: 97px;
  }
  button:nth-child(1) {
    margin-right: 0.5rem;
  }

  @media (max-width: 860px) {
    button {
      min-width: 75px;
    }
    button:nth-child(1) {
      margin-right: 0.35rem;
    }
  }
`;
