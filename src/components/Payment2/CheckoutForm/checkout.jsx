import React, { useState } from 'react'
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js'
import CardSection from './CardSection'

export default function CheckoutForm(props) {
  const [err, setErr] = useState('')

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make  sure to disable form submission until Stripe.js has loaded.
      return
    }

    const card = elements.getElement(CardElement)
    const result = await stripe.createToken(card)

    if (result.error) {
      // Show error to your customer.
      console.log(result.error.message)
      setErr(result.error)
    } else {
      // Send the token to parent.
      stripeTokenHandler(result.token)
      // setProcessing(true)
    }
  }
  const stripeTokenHandler = (token) => {
    props.setToken(token)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      {err}
      <button
        className="btn btn-success my-2"
        disabled={!stripe || props.processing}
      >
        <b>{props.processing ? 'Processing…' : 'Pay via Card'}</b>
      </button>
    </form>
  )
}
