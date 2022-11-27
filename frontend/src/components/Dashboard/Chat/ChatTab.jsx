import React, { useState, useEffect, useCallback, useRef } from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Chat from "./Chat";
import { usePubNub } from "pubnub-react";
import ConfirmTab from "../../Elements/ConfirmTab";

const ChatTab = ({ channelId, setShowChatTab, appointment, setShowReviewTab, autoCancelAppointment }) => {
  const chatRef = useRef(null);

  const pubnub = usePubNub();
  const [channels] = useState([channelId]);
  const [messages, addMessage] = useState([]);
  const [message, setMessage] = useState("");
  const [showConfirmLeave, setShowConfirmLeave] = useState(false);

  const handleMessage = useCallback((event) => {
    const message = event.message;
    if (typeof message === "string" || message.hasOwnProperty("text")) {
      const text = message.text || message;
      addMessage((messages) => [...messages, text]);
      goToRecentMessages();
    }
  }, []);

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

  const getMessages = useCallback(() => {
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
          goToRecentMessages();
        }
      }
    );
  }, [channelId, channels, pubnub]);

  const goToRecentMessages = () => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    pubnub.addListener({ message: handleMessage });
    pubnub.subscribe({ channels });
  }, [pubnub, channels, handleMessage]);

  useEffect(() => {
    if (messages.length === 0) {
      getMessages();
    }
  }, [getMessages, messages.length]);

  return (
    <>
    <Wrapper>
      <Container>
        <Header
          setShowChatTab={setShowChatTab}
          appointment={appointment}
          setShowConfirmLeave={setShowConfirmLeave}
        />
        <Chat messages={messages} channelId={channelId} chatRef={chatRef} />
        <Footer
          sendMessage={sendMessage}
          message={message}
          setMessage={setMessage}
          appointment={appointment}
        />
      </Container>
    </Wrapper>
      {showConfirmLeave && (
        <ConfirmTab
          setShow={setShowConfirmLeave}
          promptText={`You will not be able to join this session again. Are you sure you want to leave?`}
          type="danger"
          cta="Leave"
          action={() => {
            autoCancelAppointment(appointment._id)
            setShowReviewTab(true)
            setShowChatTab(false)
          }}
        />
      )}
    </>
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
