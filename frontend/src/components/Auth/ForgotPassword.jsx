import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FullButton from "../Buttons/FullButton";
import Input from "./Input";
import SuccessMessage from "../Elements/SuccessMessage";
import { post } from "../../utils/fetch";
import { ProgressBar } from "react-loader-spinner";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (email.trim() === "") {
      alert("Please fill in your email");
      return;
    }

    sendResetLink();
  };

  const sendResetLink = async () => {
    setLoading(true);

    const data = await post(
      process.env.REACT_APP_API_HOST + "auth/password-reset-link",
      { email }
    );

    setLoading(false);
    setEmail("");

    if (data.status === "ok") {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Forgot Password</h1>
        <p>
          If an account linked to your email is found, a reset link will be sent
          to your email.
        </p>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required={true}
          />
          <FullButton title="Get Password Reset Link" />
        </form>
        <button
          className="alt-buttons"
          style={{ marginTop: "1rem" }}
          onClick={() => navigate("/auth/login")}
        >
          Back to login
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

      {
        showSuccessMessage && 
        <SuccessMessage 
          setShow={setShowSuccessMessage} 
          message='Password reset link successfully sent to your email.'
        />
      }
    </>
  );
};

export default ForgotPassword;
