import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
// import CheckoutForm from './CheckoutForm'
import './payment.scss'
import db from '../../firebase'

const uuid = require('uuid')

// const stripePromise = api.getPublicStripeKey().then((key) => loadStripe(key))
const stripePromise = loadStripe('pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG')

export default class Payment extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
      cardName: '',
      cardNumber: '',
      cardCvc: '',
      cardExpMo: '',
      cardExpYear: '',
      processing: false,
    }
  }
  handleChange = (name) => (e) => {
    e.preventDefault()
    let setVal = e.target.value
    if (name === 'cardExpMo') {
      setVal = e.target.value.slice(0, 2)
    } else if (name === 'cardExpYear') {
      setVal = e.target.value.slice(0, 4)
    } else if (name === 'cardCvc') {
      setVal = e.target.value.slice(0, 3)
    } else if (name === 'cardNumber') {
      setVal = e.target.value.slice(0, 22)
    }
    this.setState({ [name]: setVal })
  }

  handleSubmit(details) {
    const payload = {
      details,
      card: {
        number: this.state.cardNumber,
        exp_month: Number(this.state.cardExpMo),
        exp_year: Number(this.state.cardExpYear),
        cvc: this.state.cardCvc,
      },
    }
    db.collection('Order').doc(uuid.v4()).set({
      payload,
      status: 'pending',
    })
    this.setState({ processing: true })
  }

  processPay() {
    console.log('proc pay')
    return <Redirect to="/success" />
  }
  render() {
    const { processing } = this.state
    const { name, email, total, order } = this.props
    const details = { name, email, total, order }
    return (
      <div className="home-container">
        <div className="container mt-4 mb-2 welcome-text">
          <h3 style={{ minHeight: '4em' }}>PAYMENT</h3>
          <h1>
            NZD{' '}
            {total.toLocaleString(navigator.language, {
              minimumFractionDigits: 2,
            })}{' '}
          </h1>
          <h4>Pay via card</h4>
          {/* <Elements stripe={stripePromise}>
            <CheckoutForm
              name={name}
              email={email}
              total={total}
              order={order}
            />
          </Elements> */}
          {/* <form> */}
          <div className="row my-2">
            <div className="col ">
              <input
                type="text"
                // id="cardNumber"
                placeholder="Name"
                value={this.state.cardName}
                className="form-control"
                onChange={this.handleChange('cardName')}
              />
            </div>
          </div>
          <div className="row my-2">
            <div className="col ">
              <input
                // id="cardNumber"
                type="text"
                placeholder="1111222233334444"
                value={this.state.cardNumber}
                className="form-control"
                onChange={this.handleChange('cardNumber')}
              />
            </div>
          </div>
          <div className="row my-2">
            <div className="col">
              <input
                type="number"
                // id="cardExpMo"
                placeholder="MM"
                className="form-control"
                value={this.state.cardExpMo}
                onChange={this.handleChange('cardExpMo')}
                max="12"
              />
            </div>
            <div className="col">
              <input
                type="number"
                // id="cardExpYear"
                placeholder="YYYY"
                className="form-control"
                value={this.state.cardExpYear}
                onChange={this.handleChange('cardExpYear')}
                max="2100"
              />
            </div>
            <div className="col">
              <input
                type="password"
                // id="cardCvc"
                placeholder="***"
                className="form-control"
                value={this.state.cardCvc}
                onChange={this.handleChange('cardCvc')}
              />
            </div>
          </div>
          <button
            className="btn btn-lg btn-success col-md-4 col-xs-8 mx-auto my-2"
            onClick={() => this.handleSubmit(details)}
            disabled={processing}
          >
            <b>{processing ? 'Processing…' : 'PAY'}</b>
          </button>
          {/* </form> */}
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
