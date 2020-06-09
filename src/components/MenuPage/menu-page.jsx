import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './menu-page.scss'
import LoadingPage from '../Loading'

import Review from './Review'
import Payment from './Payment'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
      page: 0,
    }
    this.nextPage = this.nextPage.bind(this)
    this.prevPage = this.prevPage.bind(this)
  }

  nextPage() {
    const { page } = this.state
    this.setState({ page: page + 1 })
  }

  prevPage() {
    const { page } = this.state
    this.setState({ page: page - 1 })
  }

  render() {
    if (this.props.menu) {
      const { menu } = this.props
      console.log(menu)
      switch (this.state.page) {
        case 0:
          return (
            <div className="home-container">
              <div className="container mt-4 mb-2 welcome-text">
                <h3 style={{ minHeight: '4em' }}>MENU</h3>
                {/* menu */}
                <div className="menu mt-2 mb-2">{menu[0].item}</div>
                {/* menu */}
                {/* buttons */}
                <div className="row mx-2">
                  <button
                    type="button"
                    className="btn btn-lg btn-success col-md-4 col-xs-8 mx-auto my-2"
                    onClick={this.nextPage}
                  >
                    VIEW CART
                  </button>
                  {/* <Link to={'/'} className="col-md-6 col-xs-8 mx-auto">
                  <button type="button" className="btn btn-lg btn-danger  my-2">
                  GO BACK
                  </button>
                </Link> */}
                </div>
                {/* buttons */}
              </div>
            </div>
          )
        case 1:
          return (
            <Review
              order={this.state.order}
              nextPage={this.nextPage}
              prevPage={this.prevPage}
            />
          )
        case 2:
          return (
            <Payment
              order={this.state.order}
              nextPage={this.nextPage}
              prevPage={this.prevPage}
            />
          )
        default:
          return <LoadingPage />
      }
    } else {
      return (
        <div className="container pt-4" style={{ minHeight: '52vh' }}>
          <h3>Oops! You shouldn't be here.</h3>
          This can usually happen if you press back on the browser or reload the
          page.
          <br />
          <Link to={'/'}>Click here to go back home</Link>
        </div>
      )
    }
  }
}
