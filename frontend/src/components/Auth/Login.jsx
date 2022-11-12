import React, { useState, useContext } from "react";
import FullButton from "../Buttons/FullButton";
import Input from "./Input";
import SelectRole from "./SelectRole";
import { post } from "../../utils/fetch";
import { UserContext } from "../../context/User";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "react-loader-spinner";

const defaultFormData = {
  email: "",
  password: "",
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(defaultFormData);
  const [role, setRole] = useState("");

  const navigate = useNavigate();

  const { setUserInfo } = useContext(UserContext);

  const handleInput = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!validInput()) return;

    loginIn();
  };

  const validInput = () => {
    const { email, password } = formData;

    if (role?.length === 0 || role === undefined) {
      alert("Please select your role");
      return false;
    }

    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all the fields");
      return false;
    }

    return true;
  };

  const loginIn = async () => {
    setLoading(true);

    const { email, password } = formData;

    const data = await post(process.env.REACT_APP_API_HOST + "auth/sign-in", {
      role,
      email,
      password,
    });

    setLoading(false);
    setFormData(defaultFormData);

    if (data.status === "ok") {
      let userInfo = data.user;
      userInfo.token = data.token;
      setUserInfo(userInfo);

      navigate(`/dashboard/${role}`);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="page">
      <h1>Login</h1>
      <form onSubmit={handleFormSubmit}>
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
          label="Password"
          type="password"
          value={formData.password}
          placeholder="********"
          onChange={(e) => handleInput(e, "password")}
          required={true}
        />
        <FullButton title="Login" />
      </form>
      <button
        className="alt-buttons"
        style={{ marginTop: "1rem" }}
        onClick={() => navigate("/auth/forgot-password")}
      >
        Forgot your password?
      </button>
      <button
        className="alt-buttons"
        onClick={() => navigate("/auth/register")}
      >
        Don't have an account?
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
  );
};

export default Login;
