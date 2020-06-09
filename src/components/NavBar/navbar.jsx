import React from 'react'
// import { Link } from 'react-router-dom'
import Navbars from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
// import { motion } from 'framer-motion'
import logo from '../../content-constants/logo.png'
import './navbar.scss'

import 'bootstrap/dist/css/bootstrap.min.css'

const Navbar = () => {
  return (
    <>
      <div className=" mr-auto sticky-top shadow">
        <Navbars
          bg="white"
          expand="lg"
          variant="light"
          className="justify-content-between"
        >
          <div className="container">
            <Navbars.Brand action="true">
              <a href={'https://facebook.com'}>
                <i className="fa fa-facebook-square" aria-hidden="true"></i>
              </a>
              <a href={'https://instagram.com'}>
                <i className="fa fa-instagram mx-2" aria-hidden="true"></i>
              </a>
            </Navbars.Brand>

            <Navbars.Brand action="true" href="/">
              <div className="container">
                <img
                  src={logo}
                  height="72px"
                  className="mb-0 logo-main"
                  alt="foodapp"
                />
              </div>
            </Navbars.Brand>
            <Navbars.Toggle aria-controls="basic-navbar-nav" />
            <Navbars.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto justify-content-between align-items-right">
                <Nav.Link action="true" href="/">
                  Home
                </Nav.Link>
                <Nav.Link action="true" href="/aboutus">
                  About Us
                </Nav.Link>
                <Nav.Link action="true" href="/contactus">
                  Contact Us
                </Nav.Link>
              </Nav>
            </Navbars.Collapse>
          </div>
        </Navbars>
      </div>
    </>
  )
}

export default Navbar
