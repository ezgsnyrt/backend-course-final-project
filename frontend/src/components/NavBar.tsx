import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd, faHospital, faUsers } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
    return (
        <Navbar expand="lg" className="navBar" sticky="top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="brand">
                    <FontAwesomeIcon icon={faHospital} className="me-2" />
                    DocApp
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="navbar-nav"
                    aria-label="Toggle navigation"
                />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Item>
                            <Nav.Link as={Link} to="/" className="nav-link">
                                Home
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/doctors" className="nav-link">
                                <FontAwesomeIcon icon={faUserMd} className="me-2" />
                                Doctors
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/users" className="nav-link">
                                <FontAwesomeIcon icon={faUsers} className="me-2" />
                                Patients
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
