import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../context/User";
import styled from "styled-components";

const defaultState = {
  alignment: "flex-start",
  text: "",
  name: "",
};
const Message = ({ message }) => {
  const { userInfo } = useContext(UserContext);

  const [data, setData] = useState(defaultState);

  useEffect(() => {
    let name = message.split(": ")[0];
    let text = message.split(": ")[1];
    let alignment = name === userInfo.username ? "flex-end" : "flex-start";
    name = name === userInfo.username ? 'You' : "flex-start";
    setData({ alignment, text, name });

    return () => setData(defaultState);
  }, [message, userInfo.username]);

  return (
    <Wrapper
      style={{
        alignSelf: data.alignment,
        backgroundColor:
          data.alignment === "flex-start" ? "#f3f4fa" : "#e9f2ff",
      }}
    >
      <h4 style={{ alignSelf: data.alignment }}>{
        message.split(": ")[0] === userInfo.username ? 'You' : message.split(": ")[0]
      }</h4>
      <p
        style={{
          textAlign: data.alignment === "flex-start" ? "left" : "right",
        }}
      >
        {message.split(": ")[1]}
      </p>
    </Wrapper>
  );
};

export default Message;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  border-radius: 10px;
  padding: .6rem 1rem;
  margin-bottom: 0.75rem;

  h4{
    font-size: 14px;
  }
  p {
    line-height: 20px;
  }

  @media (max-width: 860px) {
    border-radius: 7.5px;
    padding: 0.5rem .8rem;
    margin-bottom: 0.5rem;

    h4,
    p {
      font-size: 12px;
      line-height: 18px;
    }
  }
`;
