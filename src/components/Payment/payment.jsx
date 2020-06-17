import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import './payment.scss'

import api from '../../api'

const stripePromise = api.getPublicStripeKey().then((key) => loadStripe(key))

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
    }
  }
  processPay() {
    console.log('proc pay')
    return <Redirect to="/success" />
  }
  render() {
    const { name, email, total, order } = this.props
    return (
      <div className="home-container">
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>PAYMENT</h3>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              name={name}
              email={email}
              total={total}
              order={order}
            />
          </Elements>
          {/* buttons */}
          <div className="row mx-2">
            <button
              type="button"
              className="btn btn-lg btn-outline-danger col-md-4 col-xs-8 mx-auto my-2"
              onClick={() => this.processPay()}
            >
              PAY AT THE RESTAURANT
            </button>
          </div>
          {/* buttons */}
        </div>
      </div>
    )
  }
}
