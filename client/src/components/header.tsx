import React, { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useAuth } from "../contexts/AuthContext"; // 👈 dùng AuthContext

interface JwtPayload {
  roleName?: string;
  UserId?: string | number;
  [key: string]: any;
}


const SiteNavbar: React.FC = () => {
  const { token, logout } = useAuth();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      try {
        const decoded: JwtPayload = jwt_decode(token);
        console.log("Decoded token:", decoded);
  
        // 👇 Lấy role từ claim chuẩn của .NET
        const role =
          decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  
        setUserRole(role || null);
        setUserId(decoded.UserId ? Number(decoded.UserId) : null);
  
        console.log("✅ UserRole:", role);
      } catch (err) {
        console.error("Invalid token", err);
        setUserRole(null);
        setUserId(null);
      }
    } else {
      setUserRole(null);
      setUserId(null);
    }
  }, [token]);
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>JobBoard</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="mx-auto">
            <LinkContainer to="/" className="mx-1">
              <Nav.Link>Home</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/about" className="mx-1">
              <Nav.Link>About</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/job-listing" className="mx-1">
              <Nav.Link>Recruitments</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/blog" className="mx-1">
              <Nav.Link>Blog</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/contact" className="mx-1">
              <Nav.Link>Contact</Nav.Link>
            </LinkContainer>
          </Nav>

          <div className="d-flex">
            {/* 👇 chỉ Admin/Employer mới thấy nút Post a Job */}
            {(userRole === "Admin" || userRole === "Employer") && (
              <LinkContainer to="/post-job">
                <Button variant="outline-primary" className="me-2">
                  Post a Job
                </Button>
              </LinkContainer>
            )}

            {token ? (
              <>
                <LinkContainer to={userId ? `/user-profile/${userId}` : "/login"}>
                  <Button variant="primary" className="me-2">
                    Hello
                  </Button>
                </LinkContainer>
                <Button variant="outline-light" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <LinkContainer to="/login">
                <Button variant="primary">Log In</Button>
              </LinkContainer>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavbar;
