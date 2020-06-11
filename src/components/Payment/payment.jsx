import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './payment.scss'

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
    }
  }
  processPay() {
    console.log('proc pay')
    // go to status page
  }
  render() {
    return (
      <div className="home-container">
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>PAYMENT</h3>
          pay
          {/* buttons */}
          <div className="row mx-2">
            <button
              type="button"
              className="btn btn-lg btn-success col-md-4 col-xs-8 mx-auto my-2"
              onClick={() => this.processPay()}
            >
              PAY
            </button>
          </div>
          {/* buttons */}
        </div>
      </div>
    )
  }
}
