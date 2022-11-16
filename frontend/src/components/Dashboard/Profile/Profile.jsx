import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { UserContext } from "../../../context/User";
import Input from './Input'
import ProfilePicture from './ProfilePicture'
import Img from "../../../assets/img/dashboard/profile-img.jpg";
import Button from "../../Buttons/Button";

const defaultInput = {
  email: '',
  username: '',
  password: '',
  speciality: ''
}

const Profile = () => {
  const [input, setInput] = useState(defaultInput)
  const [imageFile, setImageFile] = useState(null)
  const [imageSrc, setImageSrc] = useState(Img)

  const { userInfo } = useContext(UserContext)

  const handleInput = e => {
    setInput({...input, [e.target.name]: e.target.value }) 
  }

  useEffect(() => {
    if(imageFile){
      setImageSrc(URL.createObjectURL(imageFile))
    
      return () => URL.revokeObjectURL(imageFile)
    }else{
      setImageSrc(Img)
    }
  }, [imageFile])

  useEffect(() => {
    let updatedInput = userInfo
    updatedInput.password = ''
    setInput(updatedInput)
  }, [userInfo])

  return (
    <Wrapper>
      <h1>Profile</h1>

      <Container>
          <label>Profile picture</label>
          <ProfilePicture 
            imageSrc={imageSrc}
            setImageFile={setImageFile}
          />

          <Input 
            label='Email'
            type='email'
            value={input.email}
            onChange={e => handleInput(e)}
          />
          <Input 
            label='Username'
            type='text'
            value={input.username}
            onChange={e => handleInput(e)}
          />
          <Input 
            label='Password'
            type='password'
            value={input.password}
            onChange={e => handleInput(e)}
          />
          {
            userInfo.role === 'doctor' &&
            <Input 
              label='Speciality'
              type='text'
              value={input.speciality}
              onChange={e => handleInput(e)}
            />
          }
          <Button 
            text='Update'
            type='primary'
            action={() => alert('update')}
          />
        </Container>
    </Wrapper>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  padding: 1.25rem 1.5rem .5rem;
  margin: 0.75rem auto;
  border-radius: 10px;
  box-shadow: 0 10px 25px -15px #2525252e;

  label{
    font-weight: 600;
  }
  input{
    background-color: #ECEFF5;
    border: none;
    outline: none;
    padding: .75rem 1.25rem;
    font-size: 16px;
    border-radius: 5px;
    margin-bottom: 1.25rem;
  }
  button{
    align-self: flex-end;
    margin: .25rem 0 1rem;
  }
  .no-results {
    text-align: center;
  }

  @media (max-width: 860px) {
    max-width: 500px;
    padding: 1rem 1.25rem;
    margin: 0.25rem auto;

    label{
      font-size: 12px;
    }
    input{
      font-size: 12px;
      padding: .6rem 1rem;
      margin-bottom: 1rem;
    }
    button{
      margin: .25rem 0 .25rem;
    }
    .no-results {
      font-size: 12px;
    }
  }
`;