import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import FullButton from "../Buttons/FullButton";
import Input from "./Input";
import SelectRole from "./SelectRole";
import { post } from "../../utils/fetch";
import { UserContext } from "../../context/User";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import { getImageUrlFromCloudinary } from "../../utils/cloudinary";

const defaultFormData = {
  email: "",
  password: "",
  username: "",
  confirmPassword: "",
};

const Register = () => {
  const [formData, setFormData] = useState(defaultFormData);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false)
  const [imageFile, setImageFile] = useState()
  const [imageSrc, setImageSrc] = useState()
  const { setUserInfo } = useContext(UserContext);

  const navigate = useNavigate();

  const handleInput = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  useEffect(() => {
    if(imageFile){
      setImageSrc(URL.createObjectURL(imageFile))
    
      return () => URL.revokeObjectURL(imageFile)
    }else{
      setImageSrc(null)
    }
  }, [imageFile])
  

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    if (!validInput()) return;

    registerUser();
  };

  const validInput = () => {
    const { email, username, password, confirmPassword } = formData;

    if (role?.length === 0 || role === undefined) {
      alert("Please select your role");
      return false;
    }

    if (
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === "" ||
      confirmPassword.trim() === ""
    ) {
      alert("Please fill in all the fields");
      return false;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }

    return true;
  };

  const registerUser = async () => {
    setLoading(true)

    const { email, username, password } = formData;

    const profileImage = await getImageUrlFromCloudinary(imageFile)

    const data = await post(process.env.REACT_APP_API_HOST + "auth/register", {
      role,
      email,
      username,
      password,
      profileImage: profileImage ? profileImage : null
    });

    setLoading(false)
    setFormData(defaultFormData)
    setImageFile(null)
    setImageSrc(null)
    
    if (data.status === "ok") {
      let userInfo = data.user
      userInfo.token = data.token
      setUserInfo(userInfo)

      navigate('/dashboard')
    }else{
      alert(data.error);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Register</h1>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Profile Image"
            type="file"
            required={false}
            className='img-input'
            onChange={e => setImageFile(e.target.files[0])}
          />
          {
            imageSrc &&
            <ImagePreview src={imageSrc} alt='' />
          }
          <SelectRole role={role} setRole={setRole} />
          <Input
            label="Email"
            type="email"
            value={formData.email}
            placeholder="example@email.com"
            onChange={(e) => handleInput(e, "email")}
            required={true}
          />
          <Input
            label="Username"
            type="text"
            value={formData.username}
            placeholder="Rosabel"
            onChange={(e) => handleInput(e, "username")}
            required={true}
          />
          <Input
            label="Password"
            type="password"
            value={formData.password}
            placeholder="********"
            onChange={(e) => handleInput(e, "password")}
            required={true}
          />
          <Input
            label="Confirm password"
            type="password"
            value={formData.confirmPassword}
            placeholder="********"
            onChange={(e) => handleInput(e, "confirmPassword")}
            required={true}
          />
          <FullButton title="Create Account" />
        </form>
        <button
          className="alt-buttons"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/auth/login")}
        >
          Already have an account?
        </button>
        
        <div className="loader">
          <ProgressBar
            height="60"
            visible={loading}
            borderColor="#000"
            barColor="#2d59eb"
          />
        </div>
      </div>
    </>
  );
};

export default Register;

const ImagePreview = styled.img`
  max-width: 200px;
  height: 100%;
  margin-bottom: 1.25rem;
  border-radius: 10px;
`