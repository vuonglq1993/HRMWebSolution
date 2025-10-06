import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext"; // 👈 dùng useAuth

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import jwtDecode from "jwt-decode";

import {
  validateEmail,
  validatePassword,
  validateRePassword,
  validateFullName,
  validateAddress,
  validatePhone,
} from "../../utils/validator";

interface LoginDto {
  email: string;
  password: string;
}

interface SignUpDto {
  email: string;
  password: string;
  rePassword: string;
  fullName: string;
  address: string;
  phoneNumber?: string;
  roleId: number;
}

const API_URL = import.meta.env.VITE_API_URL;
const ROLE_EMPLOYEE = Number(import.meta.env.VITE_ROLE_EMPLOYEE);
const ROLE_EMPLOYER = Number(import.meta.env.VITE_ROLE_EMPLOYER);

const LoginSignUpPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState<LoginDto>({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState<SignUpDto>({
    email: "",
    password: "",
    rePassword: "",
    fullName: "",
    address: "",
    phoneNumber: "",
    roleId: ROLE_EMPLOYEE,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const { setToken } = useAuth(); // 👈 lấy từ AuthContext
  const navigate = useNavigate();

  // --- VALIDATE ---
  const validateLogin = (): boolean => {
    const newErrors: any = {};
    newErrors.email = validateEmail(loginData.email);
    newErrors.password = validatePassword(loginData.password);
    Object.keys(newErrors).forEach((key) => !newErrors[key] && delete newErrors[key]);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = (): boolean => {
    const newErrors: any = {};
    newErrors.fullName = validateFullName(signUpData.fullName);
    newErrors.email = validateEmail(signUpData.email);
    newErrors.password = validatePassword(signUpData.password);
    newErrors.rePassword = validateRePassword(signUpData.password, signUpData.rePassword);
    newErrors.phoneNumber = validatePhone(signUpData.phoneNumber);
    newErrors.address = validateAddress(signUpData.address);
    Object.keys(newErrors).forEach((key) => !newErrors[key] && delete newErrors[key]);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- HANDLE LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginData);

      // 👇 lấy token từ response
      const token = res.data?.token || res.data?.accessToken;
      if (!token) {
        alert("Login failed: no token returned");
        return;
      }

      setToken(token); // 👈 lưu vào AuthContext (tự sync localStorage)
      alert("Login successful!");
      navigate("/");
    } catch (err: any) {
      alert("Login failed: " + (err.response?.data || err.message));
    }
  };

  // --- HANDLE SIGNUP ---
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignUp()) return;

    try {
      await axios.post(`${API_URL}/user`, {
        email: signUpData.email,
        password: signUpData.password,
        fullName: signUpData.fullName,
        phoneNumber: signUpData.phoneNumber,
        address: signUpData.address,
        roleId: signUpData.roleId,
        status: 1,
      });

      alert("Sign up successful! Please log in.");
      setIsLogin(true);
      setErrors({});
    } catch (err: any) {
      alert("Sign up failed: " + (err.response?.data || err.message));
    }
  };

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

      <div id="top">
        {/* HERO */}
        <section
          className="section-hero overlay inner-page bg-image"
          style={{ backgroundImage: "url('images/hero_1.jpg')" }}
          id="home-section"
        >
          <Container>
            <Row>
              <Col md={7}>
                <h1 className="text-white font-weight-bold">
                  {isLogin ? "Log In" : "Sign Up"}

                </h1>
              </Col>
            </Row>
          </Container>
        </section>

        {/* FORM */}
        <section className="site-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                {isLogin ? (
                  <Form className="p-4 border rounded" onSubmit={handleLogin}>
                    <h2 className="mb-4">Log In to JobBoard</h2>
                    {/* Email */}
                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    {/* Password */}
                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    {/* Submit */}
                    <Button type="submit" className="px-5 mb-3 btn-primary text-white">
                      Log In
                    </Button>

                    <GoogleLogin
                      onSuccess={async (credentialResponse) => {
                        const credential = credentialResponse.credential;
                        if (!credential) {
                          alert("No Google token received");
                          return;
                        }

                        try {
                          console.log("Google token:", credential); // ✅ debug
                          const res = await axios.post(`${API_URL}/auth/google-login`, { token: credential });

                          const token = res.data?.token;
                          if (!token) {
                            alert("Google login failed: no JWT returned from backend");
                            return;
                          }

                          setToken(token);
                          alert("Login successful with Google!");
                          navigate("/");
                        } catch (err: any) {
                          console.error("Google login error:", err);
                          alert("Google login failed: " + (err.response?.data || err.message));
                        }
                      }}
                      onError={() => {
                        alert("Google login failed");
                      }}
                      type="standard"
                      theme="outline"
                      size="large"
                    />


                    <div className="mt-3 text-center">
                      Don't have an account?{" "}
                      <Button variant="link" className="p-0" onClick={() => setIsLogin(false)}>
                        Sign up now
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <Form className="p-4 border rounded" onSubmit={handleSignUp}>
                    <h2 className="mb-4">Sign Up to JobBoard</h2>
                    {/* Full Name */}
                    <Form.Group className="mb-3" controlId="signupFullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        isInvalid={!!errors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>
                    {/* Email */}
                    <Form.Group className="mb-3" controlId="signupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>
                    {/* Address */}
                    <Form.Group className="mb-3" controlId="signupAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        value={signUpData.address}
                        onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Form.Group>
                    {/* Phone */}
                    <Form.Group className="mb-3" controlId="signupPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        value={signUpData.phoneNumber}
                        onChange={(e) => setSignUpData({ ...signUpData, phoneNumber: e.target.value })}
                        isInvalid={!!errors.phoneNumber}
                      />
                      <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                    </Form.Group>
                    {/* Role */}
                    <Form.Group className="mb-3" controlId="signupRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        value={signUpData.roleId}
                        onChange={(e) => setSignUpData({ ...signUpData, roleId: Number(e.target.value) })}
                      >
                        <option value={ROLE_EMPLOYEE}>Employee</option>
                        <option value={ROLE_EMPLOYER}>Employer</option>
                      </Form.Select>
                    </Form.Group>
                    {/* Password */}
                    <Form.Group className="mb-3" controlId="signupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>
                    {/* RePassword */}
                    <Form.Group className="mb-4" controlId="signupRePassword">
                      <Form.Label>Re-Type Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={signUpData.rePassword}
                        onChange={(e) => setSignUpData({ ...signUpData, rePassword: e.target.value })}
                        isInvalid={!!errors.rePassword}
                      />
                      <Form.Control.Feedback type="invalid">{errors.rePassword}</Form.Control.Feedback>
                    </Form.Group>
                    {/* Submit */}
                    <Button type="submit" className="px-4 btn-primary text-white">
                      Sign Up
                    </Button>
                    <div className="mt-3 text-center">
                      Already have an account?{" "}
                      <Button variant="link" className="p-0" onClick={() => setIsLogin(true)}>
                        Log in
                      </Button>
                    </div>
                  </Form>
                )}
              </Col>
            </Row>
          </Container>
        </section>
      </div>
    </GoogleOAuthProvider>

  );
};

export default LoginSignUpPage;
