import React, { useState } from "react";
import FullButton from "../Buttons/FullButton";
import { useParams } from "react-router-dom";
import Input from "./Input";
import { post } from "../../utils/fetch";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";
import SuccessMessage from "../Elements/SuccessMessage";

const defaultFormData = {
  password: "",
  confirmPassword: "",
};

const ChangePassword = () => {
  const navigate = useNavigate();

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);

  const { id, token } = useParams();

  const handleInput = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    changePassword();
  };

  const changePassword = async () => {
    setLoading(true);

    const data = await post(process.env.REACT_APP_API_HOST + "auth/reset-password", {
      password: formData.password,
      id,
      token,
    });

    setLoading(false);
    setFormData(defaultFormData);

    if (data.status === "ok") {
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
    } else {
      alert(data.error);
    }
  };

  return (
    <>
      <div className="page">
        <h1>Change Password</h1>
        <form onSubmit={handleFormSubmit}>
          <Input
            label="New password"
            type="password"
            value={formData.password}
            placeholder="example@email.com"
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
          <FullButton title="Confirm" />
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

      {showSuccessMessage && (
        <SuccessMessage
          setShow={setShowSuccessMessage}
          message="Password successfully changed"
        />
      )}
    </>
  );
};

export default ChangePassword;
