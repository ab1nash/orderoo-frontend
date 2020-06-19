import React, { useEffect, useState } from 'react'
import {
  CardElement,
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js'
import './checkout.scss'
import api from '../../../api'
import db from '../../../firebase'
import { Redirect } from 'react-router-dom'
const uuid = require('uuid')

export default function CheckoutForm(props) {
  const [amount, setAmount] = useState(0)
  const [currency, setCurrency] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cardExpMonth, setCardExpMonth] = useState(null)
  const [cardExpYear, setCardExpYear] = useState(null)
  const [cardCvc, setCardCvc] = useState('')

  const [clientSecret, setClientSecret] = useState(null)
  const [error, setError] = useState(null)
  const [metadata, setMetadata] = useState(null)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState(false)
  const stripe = useStripe()
  const elements = useElements()

  useEffect(() => {
    setAmount(props.total)
    setCurrency('NZD')
  }, [props.total])

  function handleNumberChange(e) {
    e.preventDefault()
    setCardNumber(e.target.value)
  }
  const handleSubmit = async (ev) => {
    ev.preventDefault()
    setProcessing(true)
    console.log(elements.getElement(CardElement))
    // firebase things
    // var stripe = require('stripe')(
    //   'sk_test_51GupLcI8jmMhFMUso6EjfZgQpN93jIe4Fwe9dcIm4judzjJhonob8ZqOOwpOpcYvAHv4urur8tCkWxrA3AezlHZH007KIh1RFH'
    // )
    // stripe.tokens.create(
    //   {
    //     card: elements.getElement(CardElement),
    //   },
    //   function (err, token) {
    //     console.log(token)
    //   }
    // )
    // db.collection('Order')
    //   .doc(uuid.v4())
    //   .set({
    //     new_order: {
    //       order: props.order,
    //       name: props.name,
    //       email: props.email,
    //     },
    //     status: 'pending',
    //     // card: {
    //     //   number: '4242424242424242',
    //     //   exp_month: 6,
    //     //   exp_year: 2021,
    //     //   cvc: '314',
    //     // },
    //     billing_details: {
    //       name: ev.target.name.value,
    //     },
    //   })

    // Step 3: Use clientSecret from PaymentIntent and the CardElement
    // to confirm payment with stripe.confirmCardPayment()
    // const payload = await stripe.confirmCardPayment(clientSecret, {
    //   payment_method: {
    //     card: elements.getElement(CardElement),
    //     // card: {
    //     //   number: elements.getElement(CardNumberElement),
    //     //   exp_month: 6,
    //     //   exp_year: 2021,
    //     //   cvc: '314',
    //     // },
    //     billing_details: {
    //       name: ev.target.name.value,
    //     },
    //   },
    // })
    // if (payload.error) {
    //   setError(`Payment failed: ${payload.error.message}`)
    //   setProcessing(false)
    //   // firebase things
    //   console.log('[error]', payload.error)
    // } else {
    //   setError(null)
    //   // firebase things

    //   setSucceeded(true)
    //   setProcessing(false)
    //   setMetadata(payload.paymentIntent)
    //   console.log('[PaymentIntent]', payload.paymentIntent)
    // }
  }

  const renderSuccess = () => {
    return <Redirect to="/success" />
  }

  const renderForm = () => {
    const options = {
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#aab7c4',
          },
        },
        invalid: {
          color: '#fa755a',
          iconColor: '#fa755a',
        },
      },
    }

    return (
      <form onSubmit={handleSubmit}>
        <h1>
          {currency.toLocaleUpperCase()}{' '}
          {amount.toLocaleString(navigator.language, {
            minimumFractionDigits: 2,
          })}{' '}
        </h1>
        <h4>Pay via card</h4>

        <div className="sr-combo-inputs">
          <div className="sr-combo-inputs-row">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              autoComplete="cardholder"
              className="sr-input border"
            />
          </div>

          {/* <div className="sr-combo-inputs-row"> */}
          {/* <div className="row my-2">
            <div className="col ">
              <CardNumberElement
                id="cardNumber"
                className="sr-input sr-card-element"
                options={options}
              />
              <input
                type="text"
                id="cardNumber"
                name="cnumber"
                placeholder="1111222233334444"
                autoComplete="cardholder"
                className="sr-input border"
              />
            </div>
          </div>
          <div className="row my-2">
            <div className="col">
              <CardExpiryElement
                className="sr-input sr-card-element"
                options={options}
              />
              
            </div>
            <div className="col">
              <CardCvcElement
                className="sr-input sr-card-element"
                options={options}
              />
            </div>
          </div>
        </div> */}
          <CardElement className="sr-input sr-card-element" options={options} />
        </div>

        {error && <div className="message sr-field-error">{error}</div>}

        <button
          className="btn btn-lg btn-success col-md-4 col-xs-8 mx-auto my-2"
          disabled={processing || !stripe}
        >
          <b>{processing ? 'Processing…' : 'PAY'}</b>
        </button>
      </form>
    )
  }

  return (
    <div className="checkout-form">
      <div className="sr-payment-form">
        <div className="sr-form-row" />
        {succeeded ? renderSuccess() : renderForm()}
      </div>
    </div>
  )
}
