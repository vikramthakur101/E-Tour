import { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // Import User Icon
import LoginForm from "./LoginForm";

function NavBarComponent() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const navigate = useNavigate();

  const handleOpenLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleLogout = () => {
    localStorage.removeItem("email");
    setLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8086/api")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  console.log("form navbar", categories);

  //   const navigate = useNavigate();
  const location = useLocation();

  const scrollToReviews = () => {
    if (location.pathname !== "/Dashboard") {
      navigate("/Dashboard");
      setTimeout(() => {
        const element = document.getElementById("reviews");
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500); // Small delay to ensure component renders
    } else {
      const element = document.getElementById("reviews");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar
        expand="lg"
        data-bs-theme="dark"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 999,
          height: "5rem",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          padding: "0 2rem",
        }}
      >
        <Container>
          <Navbar.Brand
            as={Link}
            to="/dashboard"
            className="fw-bold text-white"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <span style={{ color: "#3D8BFD" }}>TRAVEL</span>VISTA
          </Navbar.Brand>

          <Nav className="mx-auto d-flex gap-4">
            <Nav.Link
              as={Link}
              to="/dashboard"
              className="text-white"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              Home
            </Nav.Link>
            <NavDropdown title="Categories" id="navbarScrollingDropdown">
              {categories.length > 0 ? (
                categories.map((category) => (
                  <NavDropdown.Item
                    key={category.categoryid} // Unique key from JSON data
                    onClick={() =>
                      navigate(`/SubCategories`, {
                        state: {
                          title: category.categoryName,
                          imageUrl: category.categoryImagePath,
                          ids: category.categoryid,
                        },
                      })
                    }
                  >
                    {category.categoryName}
                  </NavDropdown.Item>
                ))
              ) : (
                <NavDropdown.Item disabled>Loading...</NavDropdown.Item>
              )}
            </NavDropdown>

            <Nav.Link as={Link} to="/Dashboard#reviews" className="text-white">
              Reviews
            </Nav.Link>
            <Nav.Link
              onClick={() => scrollToSection("contact")}
              className="text-white"
            >
              Contact Us
            </Nav.Link>
          </Nav>
          <Nav></Nav>

          <Nav>
            <NavDropdown
              title={<FaUserCircle size={30} color="white" />}
              id="userDropdown"
              align="end"
              onClick={!loggedIn ? handleOpenLogin : null} // Open login modal if not logged in
            >
              {loggedIn ? (
                <>
                  <NavDropdown.Item as={Link} to="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item onClick={handleOpenLogin}>
                  Login
                </NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      <LoginForm
        show={showLogin}
        handleClose={handleCloseLogin}
        setLoggedIn={setLoggedIn}
      />
    </>
  );
}

export default NavBarComponent;
