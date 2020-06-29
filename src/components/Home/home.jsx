import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './home.scss'

export default class Home extends Component {
  componentDidMount() {
    sessionStorage.clear()
  }
  render() {
    const { table } = this.props
    return (
      <div className="home-container" style={{ paddingBottom: '20vh' }}>
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>
            Welcome User! <br />
            <br />
            You are sitting on table {table}. Hope you enjoy your meal!
          </h3>
          {/* {isMenuLoaded ? <div>a</div> : <div>b</div>} */}
          <div className="row mx-2">
            <Link to={'/menu'} className="col-md-6 col-xs-8 mx-auto">
              <button type="button" className="btn btn-lg btn-success  my-2">
                ORDER NOW
              </button>
            </Link>
            {/* <Link to={'#'} className="col-md-6 col-xs-8 mx-auto">
              <button type="button" className="btn btn-lg btn-danger   my-2">
                CANCEL
              </button>
            </Link> */}
          </div>
        </div>
      </div>
    )
  }
}
