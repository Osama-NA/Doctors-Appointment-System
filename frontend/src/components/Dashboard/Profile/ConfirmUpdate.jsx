import React, { useState, useContext } from "react";
import { UserContext } from "../../../context/User";
import styled from "styled-components";
import Input from "./Input";
import Button from "../../Buttons/Button";
import { getImageUrlFromCloudinary } from "../../../utils/cloudinary";
import { post } from "../../../utils/fetch";

const ConfirmUpdate = ({ setImageFile, setSuccessMessage, setLoading, setShow, input, refresh, setRefresh, setShowSuccessMessage }) => {
  const [password, setPassword] = useState("");

  const { setUserInfo } = useContext(UserContext);

  const handleConfirm = async () => {
    if(password.trim().length === 0){
      alert('Please enter your password')
      return
    }
    
    setLoading(true)

    let newInfo = {
      id: input._id,
      username: input.username,
      speciality: input.speciality,
      confirmPassword: password,
    };

    if (typeof input.img === "object" && input.img !== null) {
      newInfo.profileImage = await getImageUrlFromCloudinary(input.img);
    }

    const data = await post(
      process.env.REACT_APP_API_HOST + "dashboard/update-user",
      newInfo
    );

    if (data.status === "ok") {
      setImageFile(null)
      setUserInfo(data.user)
      setSuccessMessage('Profile successfully updated')
      setShowSuccessMessage(true);
      setRefresh(!refresh);
    } else {
      alert(data.error);
    }
    setLoading(false)
    setShow(false)
  };

  return (
    <Wrapper>
      <CloseOverlay onClick={() => setShow(false)}></CloseOverlay>

      <Container>
        <Input
          label="Enter the password to update your profile"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Buttons>
          <Button
            text="Cancel"
            type="secondary"
            action={() => setShow(false)}
          />
          <Button text="Confirm" type="primary" action={handleConfirm} />
        </Buttons>
      </Container>
    </Wrapper>
  );
};

export default ConfirmUpdate;

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

const CloseOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`;

const Container = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  padding: 1.25rem 1.5rem;
  background-color: #fff;
  box-shadow: 0 5px 25px -10px #2525252e;
  border-radius: 10px;

  label {
    font-weight: 600;
  }
  input {
    background-color: #eceff5;
    border: none;
    outline: none;
    padding: 0.75rem 1.25rem;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 1.25rem;
  }
  button {
    margin: 0.25rem 0;
  }

  @media (max-width: 860px) {
    width: 100%;
    max-width: 300px;
    padding: 1rem 1.25rem;

    label {
      font-size: 12px;
    }
    input {
      font-size: 12px;
      padding: 0.6rem 1rem;
      margin-bottom: 1rem;
    }
    button {
      margin: 0.25rem 0 0.25rem;
    }
  }
`;

const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;

  .secondary {
    margin-right: 0.5rem;
  }
`;
