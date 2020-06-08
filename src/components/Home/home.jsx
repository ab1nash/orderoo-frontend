import React, { Component } from 'react'
import './home.scss'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // client side deets ?
    }
  }
  render() {
    const { table } = this.props
    return (
      <div className="home-container">
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>
            Welcome User! <br />
            <br />
            You are sitting on table {table}. Hope you enjoy your meal!
          </h3>
          <div className="row mx-2">
            <button
              type="button"
              class="btn btn-success col-md-4 col-xs-8 mx-auto my-2"
            >
              ORDER NOW
            </button>
            <button
              type="button"
              class="btn btn-danger col-md-4 col-xs-8 mx-auto my-2"
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    )
  }
}
