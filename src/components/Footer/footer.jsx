import React, { Component } from 'react'
import { motion } from 'framer-motion'
import './footer.scss'

export default class Footer extends Component {
  render() {
    return (
      <div className="container-lg footer pt-4 pb-4 sticky-bottom">
        <div className="row first d-flex text-center mt-2 ">
          <div className="col mb-4 mx-auto">
            <b>Orderoo</b>
            <div className="mt-3 text-center ">
              <a href="/">Website</a>
            </div>
            <div className="text-center ">
              <a href="/faq">FAQ</a>
            </div>
          </div>
        </div>
        <div className="social-icons col text-center mx-auto">
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
