import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/hero.jpg";

import "./login.css"; // Import the CSS file with your styles

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("http://localhost:8080/api/v1/users/login", values);
      setLoading(false);
      message.success("Login Successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      window.location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
      await message.error("Invalid Login");
      window.location.reload();
      
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container login-body" style={{ backgroundImage: `url(${image})` }}>
    {loading && <Spinner />}
    <div className="login-form">
      <div className="login-text">Login</div>
      <Form layout="vertical" onFinish={submitHandler} style={{ width: "400px" }} autoComplete="off">
      {/* label={<label style={{ color: "White" }}>Email</label>} */}
        <Form.Item  name="email"> 
          <div className="login-field">
            <div className="fas fa-envelope" />
            <Input type="email" placeholder="Email or Phone" />
          </div>
        </Form.Item>
        {/* label={<label style={{ color: "White" }}>Password</label>} */}
        <Form.Item  name="password">
          <div className="login-field">
            <div className="fas fa-lock" />
            <Input type="password" placeholder="Password" />
          </div>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
          <Button label="Login Now"  className="login-button"/>
        </div>
        <div className="new-acc" style={{ textAlign: "center" }}>
          <small><Link to="/register">New User? Register Now</Link></small>
        </div>  
      </Form>
    </div>
  </div>
  );
}

export default Login;
