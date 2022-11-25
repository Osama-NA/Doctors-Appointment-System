import moment from "moment";

export const getFormatedDate = (input) => {
  let formatedDate = input.substring(0, 24);
  let day = formatedDate.substring(0, 16);
  let hour = Number(formatedDate.substring(16, 18));
  let minutesSeconds = formatedDate.substring(18, 24);

  if (hour === 12) {
    formatedDate = day + hour + minutesSeconds + " PM";
  } else if (hour > 12) {
    hour = hour - 12;
    hour = hour < 10 ? `0${hour}` : hour;
    formatedDate = day + hour + minutesSeconds + " PM";
  } else if (hour === 0) {
    formatedDate = day + "12" + minutesSeconds + " AM";
  } else {
    formatedDate += " AM";
  }

  return formatedDate;
};

export const isAppointmentDate = (appointment) => {
  const currentDateAndTime = getFormatedDate(moment()._d.toString());

  let currentDate = getDateValues(currentDateAndTime);
  currentDate = moment()
    .year(currentDate.year)
    .month(currentDate.month)
    .date(currentDate.day);
    
  let appointmentDate = getDateValues(appointment.date);
  appointmentDate = moment()
    .year(appointmentDate.year)
    .month(appointmentDate.month)
    .date(appointmentDate.day);

  let currentTime = getTimeValues(currentDateAndTime);
  currentDate.second(currentTime.s);
  currentDate.minute(currentTime.m);
  currentDate.hour(getFormattedHours(currentTime));

  let appointmentTime = getTimeValues(appointment.date);
  appointmentDate.second(appointmentTime.s);
  appointmentDate.minute(appointmentTime.m);
  appointmentDate.hour(getFormattedHours(appointmentTime));

  if (currentDate.isBefore(appointmentDate)) {
    return {
      status: false,
      message: 'early'
    };
  }

  appointmentDate.add(1, "hours");

  if (currentDate.isAfter(appointmentDate)) {
    return {
      status: false,
      message: 'finished',
      expiryTime: appointmentDate._d
    };
  }

  return {
    status: true,
    message: 'joined',
    expiryTime: appointmentDate._d
  };
};

const getTimeValues = (time) => {
  return {
    h: Number(time.substring(16, 18)),
    m: Number(time.substring(19, 21)),
    s: Number(time.substring(22, 24)),
    t: time.substring(25, 27),
  };
};

const getDateValues = (date) => {
  return {
    day: Number(date.substring(8, 10)),
    month: date.substring(4, 7),
    year: Number(date.substring(11, 15)),
  };
};

const getFormattedHours = (time) => {
  return time.t === "PM"
    ? time.h === 12
      ? time.h
      : time.h + 12
    : time.h === 12
    ? time.h - 12
    : time.h;
};