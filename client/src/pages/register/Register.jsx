import React, { useEffect, useState } from "react";
import Button from "../../components/Button/button";
import { Form, Input, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import image from "../../assets/hero.jpg"

import axios from "axios";

import "../Login/login.css"; // Import the CSS file with your styles

function Register() {
  const [errorMsg,setErrorMsg]=useState("")
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const submitHandler = async (values) => {
    try {
      console.log(values);
      setLoading(true);
      await axios.post('http://localhost:8080/api/v1/users/register/', values);
      message.success("Registration Done");
      navigate('/login');
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setErrorMsg("registration Failed"+err.message);
      console.log(err);
      message.error("Registration Failed");
    }
  }



  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="login-container login-body " style={{ backgroundImage: `url(${image})`}}>
      
      <div className="login-form" style={{maxWidth:'590px'}}>
        <div className="login-text">Register</div>
        <Form layout="vertical" onFinish={submitHandler} autoComplete="off">
        {/* label={<label style={{ color: "White" }}>Name</label>} */}
          <Form.Item name="name">
            <div className="login-field">
              <div className="fas fa-user" />
              <Input placeholder="Full Name" name="fullName"/>
            </div>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
            {/* label={<label style={{ color: "White" }}>Phone Number</label>} */}
              <Form.Item name="phoneNumber">
                <div className="login-field">
                  <div className="fas fa-phone" />
                  <Input type="tel" placeholder="Phone Number" name="phoneNumber"/>
                </div>
              </Form.Item>
            </Col>
            {/* label={<label style={{ color: "White" }}>City</label>} */}
            <Col span={12}>
              <Form.Item name="city">
                <div className="login-field">
                  <div className="fas fa-building" />
                  <Input placeholder="City" name="city"/>
                </div>
              </Form.Item>
            </Col>
          </Row>
          {/* label={<label style={{ color: "White" }}>Email</label>} */}
          <Form.Item rules={[
           { required: true,
            message: "Please enter your email",
          },
          {
            type:"email",message:"Please Enter a valid email"
          }
        ]} name="email">
            <div className="login-field">
              <div className="fas fa-envelope" />
              <Input type="email" placeholder="Email "  name="email" />
            </div>
          </Form.Item>
          {/* label={<label style={{ color: "White" }}>Password</label>} */}
          <Form.Item
  name="password"
  rules={[
    {
      validator: (_, value) => {
        const hasDigit = /\d/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasSpecialChar = /[!@#$%^&*()-+=^]/.test(value);
        const hasWhitespace = /\s/.test(value);

        let errorMessage = '';

        if(value.length<8){
          errorMessage+='Password must be at least 8 characters!';
        }
        if(value.length>15){
          errorMessage+='Password must be at most 15 characters!';
        }

        if (!hasDigit) {
          errorMessage += 'Password must contain at least one digit.\n ';
        }

        if (!hasLowercase) {
          errorMessage += 'Password must contain at least one lowercase letter.\n ';
        }

        if (!hasUppercase) {
          errorMessage += 'Password must contain at least one uppercase letter.\n ';
        }

        if (!hasSpecialChar) {
          errorMessage += 'Password must contain at least one special character (!@#$%^&*()-+=^).\n ';
        }

        if (hasWhitespace) {
          errorMessage += 'Password cannot contain white space.\n ';
        }

        if (errorMessage) {
          setErrorMsg(errorMessage.trim());
          return Promise.reject(); 
        }

        setErrorMsg(""); 
        return Promise.resolve();
      },
    },
    
  ]}

>
  <div className="login-field">
    <div className="fas fa-lock" />
    <Input type="password" name="password" placeholder="Password" />
  </div>
</Form.Item>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <Button label="Register Now" className="login-button"/>
          </div>
          <div className="new-acc" style={{ textAlign: "center" }}>
            <small><Link className="Link" to="/login">Already have an account? Login</Link></small>
          </div>
          <div  name="errorMessage" style={{color:"white"}}>
            {errorMsg}
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
