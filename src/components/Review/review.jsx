import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './review.scss'
import db from '../../firebase'
class Element extends React.Component {
  // [order: backwards update]
  constructor(props) {
    super(props)
    this.state = {
      // price: 0,
      // quantity: 0,
    }
  }

  render() {
    const { item } = this.props
    const { dishObj, qty } = item
    // const { quantity, price } = this.state
    return (
      <div className="item-row">
        <div className="row mb-2 ">
          <div className="col mt-4 mb-2">{dishObj.name}</div>
          <div className="col mt-4 mb-2">{qty}</div>

          <div className="col mt-4 mb-2">$ {dishObj.price * qty}</div>
        </div>
      </div>
    )
  }
}

export default class Review extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
      name: '',
      email: '',
    }
  }

  handleChange = (name) => (e) => {
    e.preventDefault()
    this.setState({ [name]: e.target.value })
  }
  render() {
    const { name, email } = this.state
    const { order, total } = this.props
    console.log(total)
    return (
      <div className="review-container">
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>REVIEW YOUR ORDER</h3>
          <div className="border container text-left">
            <div className="item-row">
              <div className="row mb-2 ">
                <div className="col mt-4 mb-2  ">NAME</div>
                <div className="col mt-4 mb-2">QTY</div>
                <div className="col mt-4 mb-2">PRICE</div>
              </div>
            </div>
            {/* order list */}
            {order.map((item, idx) => {
              return <Element item={item} key={idx} />
            })}
            {/* order list */}
            <div className="item-row ">
              <div className="row mb-2 ">
                <div className="col mt-4 mb-2"></div>
                <div className="col mt-4 mb-2 ">TOTAL</div>

                <div className="col mt-4 mb-2 font-weight-bold">$ {total}</div>
              </div>
            </div>
          </div>
          <div className="item-row">
            <div className="row px-2 py-2">Who is this order for?</div>
            <form>
              <input
                type="text"
                value={this.state.name}
                onChange={this.handleChange('name')}
                placeholder="Name"
                className="mb-2 form-control"
              />

              <input
                type="email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                placeholder="Email"
                className="form-control"
              />
              <small>
                <p className="text-justify mt-2">
                  * Email is collected only for sending your bills. We will not
                  store your email ID or give it away to pesky ad companies.
                </p>
              </small>
            </form>
          </div>
          {/* buttons */}
          <div className="row mx-2">
            <Link to={'/payment'} className="col-md-6 col-xs-8 mx-auto">
              <button
                type="button"
                className="btn btn-lg btn-success col-md-6 col-xs-8 mx-auto my-2"
                onClick={() => {
                  this.props.saveCreds(name, email)
                }}
              >
                PROCEED
              </button>
            </Link>
            <Link to={'/menu'} className="col-md-6 col-xs-8 mx-auto">
              <button
                type="button"
                className="btn btn-lg btn-danger col-md-6 col-xs-8 mx-auto  my-2"
              >
                {/* todo: save state! */}
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
