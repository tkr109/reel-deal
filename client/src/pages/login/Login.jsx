import React, { useEffect, useState } from "react";
import Button from "../../components/button/Button";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import image from "../../assets/hero.jpg";

import "./login.css"; 
import { BASE_URL } from "../../components/helper";

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg,setErrorMsg]=useState("");
  const submitHandler = async (values) => {
    
    try {
      setLoading(true);
      const { data } = await axios.post(`${BASE_URL}api/v1/users/login`, values);
      setLoading(false);
      message.success("Login Successful");
      localStorage.setItem("user", JSON.stringify({ ...data.user, password: "" }));
      window.location.reload();
      navigate("/")
    } catch (error) {
      setLoading(false);
      console.log(error);
      await message.error("Invalid Login");
       setErrorMsg("Invalid Login")
      console.log(errorMsg)
      // window.location.reload();
      
    }
  }

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container login-body"style={{ backgroundImage: `url(${image})`}}>
    {/* {loading && <Spinner />} */}
    <div className="login-form">
      <div className="login-text">Login</div>
      <Form layout="vertical" onFinish={submitHandler} style={{ width: "400px" }} autoComplete="off">
      {/* label={<label style={{ color: "White" }}>Email</label>} */}
        <Form.Item  name="email"> 
          <div className="login-field">
            <Input type="email" placeholder="Email or Phone" name="email"/>
          </div>
        </Form.Item>
        {/* label={<label style={{ color: "White" }}>Password</label>} */}
        <Form.Item  name="password">
          <div className="login-field">
            <Input type="password" placeholder="Password" name="password"/>
          </div>
        </Form.Item>
        <div style={{ display: "flex", justifyContent: "center", marginTop: "40px"}}>
          <Button label="Login Now" id="login" className="login-button" name="login" />
        </div>
        <div className="new-acc" style={{ textAlign: "center" }}>
          <small><Link to="/register">New User? Register Now</Link></small>
        </div> 
        <div style={{margin:'0px',padding:'0px',color:'red'}} >
          <p name="errorMessage">{errorMsg}</p>
        </div>
      </Form>
    </div>
  </div>
  );
}

export default Login;