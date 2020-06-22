import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import './success.scss'

export default class Success extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
    }
  }
  componentWillUnmount() {
    sessionStorage.clear()
  }
  render() {
    return (
      <div className="home-container">
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>SUCCESS!</h3>
          Your order will be prepared shortly.
        </div>
      </div>
    )
  }
}
