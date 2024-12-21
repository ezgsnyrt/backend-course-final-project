import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMd, faHospital, faUsers } from "@fortawesome/free-solid-svg-icons";

const NavBar: React.FC = () => {
    return (
        <Navbar
            expand="lg"
            className="navBar"
            sticky="top"
        >
            <Container>
                <Navbar.Brand href="#home" className="brand">
                    <FontAwesomeIcon icon={faHospital} className="me-2" />
                    DocApp
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="navbar-nav"
                    aria-label="Toggle navigation"
                />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="#home" className="navLink">
                            Home
                        </Nav.Link>
                        <Nav.Link href="#doctors" className="navLink">
                            <FontAwesomeIcon icon={faUserMd} className="me-2" />
                            Doctors
                        </Nav.Link>
                        <Nav.Link href="#users" className="navLink">
                            <FontAwesomeIcon icon={faUsers} className="me-2" />
                            Users
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;