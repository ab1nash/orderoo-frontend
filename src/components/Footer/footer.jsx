import React, { Component } from 'react'
import { motion } from 'framer-motion'
import './footer.scss'

export default class Footer extends Component {
  render() {
    return (
      <div className="container-lg footer pt-4 pb-4 sticky-bottom">
        <div className="row first d-flex text-center mt-2 ">
          <div className="col-md-6 mb-4 col-xs-12">
            <h6>
              <b>About Us</b>
            </h6>
            <p className="text-justify ml-3 mr-3 p-about-us mx-auto">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure est
              porro molestias dolor minus vitae temporibus accusantium et
              magnam, doloremque quia corrupti expedita excepturi doloribus,
              beatae libero. Repellendus, perspiciatis eos.
            </p>
          </div>
          <div className="col-md-6 col-xs-12 mb-4">
            <b>foodApp</b>
            <div className="mt-3 text-center ">
              <a href="/">Website</a>
            </div>
            <div className="text-center ">
              <a href="/faq">FAQ</a>
            </div>
          </div>
        </div>
        <div className="social-icons col-md-12 text-center">
          <a href="https://facebook.com">
            <motion.i
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fa fa-facebook-square"
              style={{ color: 'white' }}
            ></motion.i>
          </a>
          <a href="https://instagram.com">
            <motion.i
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.8 }}
              className="fa fa-instagram mx-2"
              style={{ color: 'white' }}
            ></motion.i>
          </a>
        </div>
        <hr />

        <div className="row second text-center">
          <div className="col-12 mt-2 mb-2 ">
            Copyright &#169; 2020 <code>42abinash</code>
          </div>
        </div>
      </div>
    )
  }
}
