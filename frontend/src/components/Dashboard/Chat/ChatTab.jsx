import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "../../../context/User";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Chat from "./Chat";
import { usePubNub } from "pubnub-react";

const ChatTab = ({ channelId, setShowChatTab, appointment }) => {
  const { userInfo } = useContext(UserContext);

  const pubnub = usePubNub();
  const [channels] = useState([channelId]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");

  const handleMessage = (event) => {
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      addMessage((messages) => [...messages, text]);
    }
  };

  const sendMessage = useCallback(
    (message) => {
      if (message) {
        pubnub
          .publish({ channel: channels[0], message })
          .then(() => setMessage(""));
      }
    },
    [channels, pubnub]
  );

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
    pubnub.fetchMessages(
      {
        channels: channels,
        count: 100,
      },
      (status, response) => {
        if (status.statusCode === 200) {
          let oldMessages = response.channels[channelId].map((message) => {
            return message.message;
          });
          addMessage(oldMessages);
        }
      }
    );
  }, [pubnub, channels, channelId, sendMessage, userInfo.username]);

  return (
    <Wrapper>
      <Container>
        <Header setShowChatTab={setShowChatTab} appointment={appointment} />
        <Chat messages={messages} channelId={channelId} />
        <Footer
          sendMessage={sendMessage}
          message={message}
          setMessage={setMessage}
          appointment={appointment}
        />
      </Container>
    </Wrapper>
  );
};

export default ChatTab;

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
  z-index: 1;
`;

const Container = styled.main`
  width: 550px;
  height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;
  overflow: hidden;

  @media (max-width: 860px) {
    width: 100%;
    max-width: 450px;
    height: 500px;
  }
`;
