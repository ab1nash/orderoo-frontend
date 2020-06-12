import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './review.scss'

export default class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
    }
  }
  render() {
    const { order } = this.props
    console.log(order)
    return (
      <div className="home-container">
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>REVIEW YOUR ORDER</h3>
          {/* {order[0].order[0].name} */}
          {/* buttons */}
          <div className="row mx-2">
            <Link to={'/payment'} className="col-md-6 col-xs-8 mx-auto">
              <button
                type="button"
                className="btn btn-lg btn-success col-md-6 col-xs-8 mx-auto my-2"
              >
                PROCEED
              </button>
            </Link>
            <Link to={'/menu'} className="col-md-6 col-xs-8 mx-auto">
              <button
                type="button"
                className="btn btn-lg btn-danger col-md-6 col-xs-8 mx-auto  my-2"
              >
                MODIFY ORDER
              </button>
            </Link>
          </div>
          {/* buttons */}
        </div>
      </div>
    )
  }
}
