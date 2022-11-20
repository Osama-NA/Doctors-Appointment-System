import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import Input from "./Input";
import ProfilePicture from "./ProfilePicture";
import Img from "../../../assets/img/dashboard/profile-img.jpg";
import Button from "../../Buttons/Button";
import ConfirmUpdate from "./ConfirmUpdate";
import SuccessMessage from "../../Elements/SuccessMessage";
import { ProgressBar } from "react-loader-spinner";
import { post } from "../../../utils/fetch";

const defaultInput = {
  username: "",
  speciality: "",
};

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [ShowConfirmUpdate, setShowConfirmUpdate] = useState(false);
  const [input, setInput] = useState(defaultInput);
  const [imageFile, setImageFile] = useState(null);
  const [imageSrc, setImageSrc] = useState(Img);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { userInfo } = useContext(UserContext);

  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const getPasswordResetLink = async () => {
    setLoading(true)

    const data = await post(
      process.env.REACT_APP_API_HOST + "auth/password-reset-link",
      { email: userInfo.email }
    );
    
    setLoading(false);

    if (data.status === "ok") {
      setSuccessMessage('A password reset link has been sent to your email.')
      setShowSuccessMessage(true)
    } else {
      alert(data.error);
    }
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setShowConfirmUpdate(true)
  };

  useEffect(() => {
    if (imageFile) {
      setImageSrc(URL.createObjectURL(imageFile));

      return () => URL.revokeObjectURL(imageFile);
    } else {
      setImageSrc(userInfo.profileImage ? userInfo.profileImage : Img);
    }
  }, [imageFile, userInfo.profileImage]);

  useEffect(() => {
    if (userInfo.password) {
      let updatedInput = userInfo;
      setInput(updatedInput);
    }
  }, [userInfo, refresh]);

  return (
    <>
      <Wrapper>
        <h1>Profile</h1>

        <Container onSubmit={handleUpdate}>
          <label>Profile picture</label>
          <ProfilePicture imageSrc={imageSrc} setImageFile={setImageFile} />

          <Input
            label="Username"
            type="text"
            value={input.username}
            onChange={(e) => handleInput(e)}
          />
          {userInfo.role === "doctor" && (
            <Input
              label="Speciality"
              type="text"
              value={input.speciality}
              onChange={(e) => handleInput(e)}
            />
          )}
          <p className="password-reset" onClick={getPasswordResetLink}>Get password reset link</p>
          <Button text="Update" type="primary" />
          
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

      {ShowConfirmUpdate && (
        <ConfirmUpdate
          setShow={setShowConfirmUpdate}
          input={{...input, img: imageFile}}
          refresh={refresh}
          setRefresh={setRefresh}
          setShowSuccessMessage={setShowSuccessMessage}
          setSuccessMessage={setSuccessMessage}
          setLoading={setLoading}
          setImageFile={setImageFile}
        />
      )}
      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message={successMessage}
        />
      )}
    </>
  );
};

export default Profile;

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

const Container = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem 0.5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

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
    align-self: flex-end;
    margin: 0.25rem 0 1rem;
  }
  .password-reset{
    cursor: pointer;
    font-weight: 600;
    color: #2d59eb;
    transition: all .25s ease;

    &:hover{
      color: #2248c5;
    }
  }
  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    label, .no-results, .password-reset {
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

const Loader = styled.div`
  position: absolute;
  bottom: -4.5rem;
  left: 44%;
  
  @media (max-width: 860px){
    bottom: -4rem;
    left: 42%;
  }
  @media (max-width: 460px){
    left: 40%;
  }
`