import React, { useEffect, useState } from "react";
import Button from "../../components/Button/button";
import { Form, Input, Row, Col, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import "../Login/login.css"; // Import the CSS file with your styles

function Register() {
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
    <div className="login-container login-body" style={{ backgroundImage: `url("https://assets.nflxext.com/ffe/siteui/vlv3/f841d4c7-10e1-40af-bcae-07a3f8dc141a/f6d7434e-d6de-4185-a6d4-c77a2d08737b/US-en-20220502-popsignuptwoweeks-perspective_alpha_website_medium.jpg")` }}>
      
      <div className="login-form">
        <div className="login-text">Register</div>
        <Form layout="vertical" onFinish={submitHandler} autoComplete="off">
        {/* label={<label style={{ color: "White" }}>Name</label>} */}
          <Form.Item name="name">
            <div className="login-field">
              <div className="fas fa-user" />
              <Input placeholder="Full Name" />
            </div>
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
            {/* label={<label style={{ color: "White" }}>Phone Number</label>} */}
              <Form.Item name="phoneNumber">
                <div className="login-field">
                  <div className="fas fa-phone" />
                  <Input type="tel" placeholder="Phone Number"/>
                </div>
              </Form.Item>
            </Col>
            {/* label={<label style={{ color: "White" }}>City</label>} */}
            <Col span={12}>
              <Form.Item name="city">
                <div className="login-field">
                  <div className="fas fa-building" />
                  <Input placeholder="City"/>
                </div>
              </Form.Item>
            </Col>
          </Row>
          {/* label={<label style={{ color: "White" }}>Email</label>} */}
          <Form.Item name="email" rules={[
           { required: true,
            message: "Please enter your email",
          },
          {
            type:"email",message:"Please Enter a valid email"
          }
        ]}>
            <div className="login-field">
              <div className="fas fa-envelope" />
              <Input type="email" placeholder="Email " />
            </div>
          </Form.Item>
          {/* label={<label style={{ color: "White" }}>Password</label>} */}
          <Form.Item
  name="password"
  rules={[
    {
      max:15,
      message: 'Password must be at most 15 characters!',
    },
    {
      validator: (_, value) => {
        const hasDigit = /\d/.test(value);
        const hasLowercase = /[a-z]/.test(value);
        const hasUppercase = /[A-Z]/.test(value);
        const hasSpecialChar = /[!@#$%^&*()-+=^]/.test(value);
        const hasWhitespace = /\s/.test(value);

        let errorMessage = '';
        console.log(value)

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
          return Promise.reject(errorMessage.trim());
        }

        return Promise.resolve();
      },
    },
    
  ]}

>
  <div className="login-field">
    <div className="fas fa-lock" />
    <Input type="password" placeholder="Password" />
  </div>
</Form.Item>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "40px" }}>
            <Button label="Register Now" className="login-button"/>
          </div>
          <div className="new-acc" style={{ textAlign: "center" }}>
            <small><Link className="Link" to="/login">Already have an account? Login</Link></small>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Register;
