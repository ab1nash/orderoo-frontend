import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './review.scss'
// import db from '../../firebase'
class Element extends React.Component {
  // [order: backwards update]
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { item } = this.props
    const { dishObj, qty } = item

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
      target: '#',
      err: '',
    }
  }
  validateEmail(email) {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
  }
  changeError() {
    if (this.state.name.length < 3 || !this.validateEmail(this.state.email)) {
      this.setState({
        err:
          '* Please fill both the fields to continue. The name must be greater than 3 characters long and email must be in a proper format as follows: example@example.com',
      })
    }
  }
  handleChange = (name) => (e) => {
    e.preventDefault()
    this.setState({ [name]: e.target.value })

    if (this.state.name.length > 3 && this.validateEmail(this.state.email)) {
      this.setState({ target: '/payment', err: '' })
    } else {
      if (name === 'name') {
        if (this.state.name.length < 3) {
          this.setState({
            target: '#',
            err: '* The name must be greater than three characters long',
          })
        } else {
          this.setState({
            target: '#',
            err: '',
          })
        }
      } else if (name === 'email') {
        if (!this.validateEmail(this.state.email)) {
          this.setState({
            target: '#',
            err: '* Please enter the email as follows- example@example.com',
          })
        } else {
          this.setState({
            target: '#',
            err: '',
          })
        }
      }
    }
  }
  render() {
    const { name, email, target } = this.state
    const { order, total } = this.props

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
              <div style={{ color: 'red' }}>{this.state.err}</div>
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
            <Link to={target} className="col-md-6 col-xs-8 mx-auto">
              <button
                type="button"
                className="btn btn-lg btn-success col-md-6 col-xs-8 mx-auto my-2"
                onClick={() => {
                  this.props.saveCreds(name, email)
                  this.changeError()
                }}
              >
                PROCEED
              </button>
            </Link>
            <Link to={'/menu'} className="col-md-6 col-xs-8 mx-auto">
              <button
                type="button"
                className="btn btn-lg btn-danger col-md-6 col-xs-8 mx-auto  my-2"
                // onclick={window.history.back()}
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
