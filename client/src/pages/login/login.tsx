import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import axios from "axios";

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

  const navigate = useNavigate();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // --- VALIDATE FUNCTIONS ---
  const validateEmail = (email: string) => {
    if (!email) return "Email bắt buộc";
    if (!/\S+@\S+\.\S+/.test(email)) return "Email không hợp lệ";
    return "";
  };

  const validatePassword = (password: string) => {
    if (!password) return "Password bắt buộc";
    return "";
  };

  const validateRePassword = (password: string, rePassword: string) => {
    if (password !== rePassword) return "Password và Re-Type Password phải giống nhau";
    return "";
  };

  const validateFullName = (fullName: string) => {
    if (!fullName) return "Full name bắt buộc";
    return "";
  };

  const validateaddress = (address: string) => {
    if (!address) return "address bắt buộc";
    return "";
  };

  const validatePhone = (phone?: string) => {
    if (!phone) return "";
    if (!/^\d{9,15}$/.test(phone)) return "SĐT phải là số và từ 9 đến 15 chữ số";
    return "";
  };

  const validateLogin = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    newErrors.email = validateEmail(loginData.email);
    newErrors.password = validatePassword(loginData.password);

    // Remove empty errors
    Object.keys(newErrors).forEach((key) => !newErrors[key] && delete newErrors[key]);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateSignUp = (): boolean => {
    const newErrors: { [key: string]: string } = {};
    newErrors.fullName = validateFullName(signUpData.fullName);
    newErrors.email = validateEmail(signUpData.email);
    newErrors.password = validatePassword(signUpData.password);
    newErrors.rePassword = validateRePassword(signUpData.password, signUpData.rePassword);
    newErrors.phoneNumber = validatePhone(signUpData.phoneNumber);

    Object.keys(newErrors).forEach((key) => !newErrors[key] && delete newErrors[key]);
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isLoginFormValid = (): boolean => {
    return (
      loginData.email.trim() !== "" &&
      loginData.password.trim() !== "" &&
      !validateEmail(loginData.email) &&
      !validatePassword(loginData.password)
    );
  };
  const isSignUpFormValid = (): boolean => {
    return (
      signUpData.fullName.trim() !== "" &&
      signUpData.email.trim() !== "" &&
      signUpData.password.trim() !== "" &&
      signUpData.rePassword.trim() !== "" &&
      !validateEmail(signUpData.email) &&
      !validatePassword(signUpData.password) &&
      !validateRePassword(signUpData.password, signUpData.rePassword) &&
      !validatePhone(signUpData.phoneNumber)
    );
  };
  // --- HANDLE LOGIN ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    try {
      const res = await axios.post(`${API_URL}/auth/login`, loginData);
      localStorage.setItem("token", res.data.token);
      alert("Login thành công!");
      navigate("/"); 

    } catch (err: any) {
      alert("Login thất bại: " + (err.response?.data || err.message));
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
      alert("Đăng ký thành công! Vui lòng đăng nhập.");
      setIsLogin(true);
      setErrors({});
    } catch (err: any) {
      alert("Đăng ký thất bại: " + (err.response?.data || err.message));
    }
  };

  return (
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
              <h1 className="text-white font-weight-bold">{isLogin ? "Log In" : "Sign Up"}</h1>
            </Col>
          </Row>
        </Container>
      </section>

      {/* FORM LOGIN / SIGNUP */}
      <section className="site-section">
        <Container>
          <Row className="justify-content-center">
            <Col lg={6}>
              {isLogin ? (
                <>
                  <h2 className="mb-4">Log In To JobBoard</h2>
                  <Form className="p-4 border rounded" onSubmit={handleLogin}>
                    <Form.Group className="mb-3" controlId="loginEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        onBlur={() =>
                          setErrors({ ...errors, email: validateEmail(loginData.email) })
                        }
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="loginPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        onBlur={() =>
                          setErrors({ ...errors, password: validatePassword(loginData.password) })
                        }
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="px-4 btn-primary text-white"
                      disabled={!isLoginFormValid()} // disabled nếu form login không hợp lệ
                    >
                      Log In
                    </Button>
                  </Form>

                  <div className="mt-3 text-center">
                    <span>Bạn không có tài khoản? </span>
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => {
                        setIsLogin(false);
                        setErrors({});
                      }}
                    >
                      Đăng ký ngay
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mb-4">Sign Up To JobBoard</h2>
                  <Form className="p-4 border rounded" onSubmit={handleSignUp}>
                    <Form.Group className="mb-3" controlId="signupFullName">
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Full Name"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        onBlur={() =>
                          setErrors({ ...errors, fullName: validateFullName(signUpData.fullName) })
                        }
                        isInvalid={!!errors.fullName}
                      />
                      <Form.Control.Feedback type="invalid">{errors.fullName}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="signupEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Email address"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        onBlur={() =>
                          setErrors({ ...errors, email: validateEmail(signUpData.email) })
                        }
                        isInvalid={!!errors.email}
                      />
                      <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="signupAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Address"
                        value={signUpData.address}
                        onChange={(e) => setSignUpData({ ...signUpData, address: e.target.value })}
                        onBlur={() =>
                          setErrors({ ...errors, address: validateaddress(signUpData.address) })
                        }
                        isInvalid={!!errors.address}
                      />
                      <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                    </Form.Group>
                    

                    <Form.Group className="mb-3" controlId="signupPhone">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Phone number"
                        value={signUpData.phoneNumber}
                        onChange={(e) => setSignUpData({ ...signUpData, phoneNumber: e.target.value })}
                        onBlur={() =>
                          setErrors({ ...errors, phoneNumber: validatePhone(signUpData.phoneNumber) })
                        }
                        isInvalid={!!errors.phoneNumber}
                      />
                      <Form.Control.Feedback type="invalid">{errors.phoneNumber}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="signupRole">
                      <Form.Label>Role</Form.Label>
                      <Form.Select
                        value={signUpData.roleId}
                        onChange={(e) => setSignUpData({ ...signUpData, roleId: Number(e.target.value) })}
                        required
                      >
                        <option value={ROLE_EMPLOYEE}>Employee</option>
                        <option value={ROLE_EMPLOYER}>Employer</option>
                      </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="signupPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        onBlur={() =>
                          setErrors({ ...errors, password: validatePassword(signUpData.password) })
                        }
                        isInvalid={!!errors.password}
                      />
                      <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="signupRePassword">
                      <Form.Label>Re-Type Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Re-type Password"
                        value={signUpData.rePassword}
                        onChange={(e) => setSignUpData({ ...signUpData, rePassword: e.target.value })}
                        onBlur={() =>
                          setErrors({
                            ...errors,
                            rePassword: validateRePassword(signUpData.password, signUpData.rePassword),
                          })
                        }
                        isInvalid={!!errors.rePassword}
                      />
                      <Form.Control.Feedback type="invalid">{errors.rePassword}</Form.Control.Feedback>
                    </Form.Group>

                    <Button
                      type="submit"
                      className="px-4 btn-primary text-white"
                      disabled={!isSignUpFormValid()} // disabled nếu form signup không hợp lệ
                    >
                      Sign Up
                    </Button>
                  </Form>

                  <div className="mt-3 text-center">
                    <span>Bạn đã có tài khoản? </span>
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => {
                        setIsLogin(true);
                        setErrors({});
                      }}
                    >
                      Đăng nhập
                    </Button>
                  </div>
                </>
              )}
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default LoginSignUpPage;
