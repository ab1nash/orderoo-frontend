import React from 'react'
import { Redirect } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import db from '../../firebase'
import CheckoutForm from './CheckoutForm'

const uuid = require('uuid')
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  'pk_test_51GupLcI8jmMhFMUsAzTdXX3nlQHUVrxSh9leoCMnAVQ9S9OEotWkxCUmJyvE0f8Vaamic4tu6nKBu5deYONgtuB100kZOCP3G2'
)

export default class Payment extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      count: 0,
      // token: {},
      txnId: uuid.v4(),
      processing: false,
      redirect: false,
      paid: false,
      watch: false,
      err: '',
    }
  }
  componentDidUpdate() {
    if (this.state.watch && this.state.count === 1) {
      db.collection('Order')
        .doc(this.state.txnId)
        .onSnapshot(
          (snap) => {
            console.log(snap.data())
            if (snap.data().status === 'success') {
              console.log('this1')
              this.setState({ paid: true }, () => this.processPay())
              this.setState({ count: 0 })
            } else if (snap.data().status === 'failed') {
              console.log('this2')
              this.setState({
                paid: false,
                processing: false,
                txnId: uuid.v4(),
                err: 'Payment failed. Please try again',
              })
              this.setState({ count: 0 })
            } else {
              console.log('this3')
              this.setState({ count: 0 })
            }
          },
          (err) => {
            console.log(`Encountered error: ${err}`)
          }
        )
    }
  }
  setToken = (token) => {
    this.setState({ token, processing: true, watch: true, count: 1 }, () => {
      db.collection('Order').doc(this.state.txnId).set({
        status: 'pending',
        token: token.id,
        amount: this.props.total,
        name: this.props.name,
        email: this.props.email,
        order: this.props.order,
      })
    })
  }

  refreshTxnId = () => {
    this.setState({ txnId: uuid.v4() })
  }

  processPay() {
    sessionStorage.clear()
    // this.props.setPaid()
    this.setState({ redirect: true })
  }

  render() {
    const { total } = this.props
    const { txnId, processing } = this.state
    if (this.state.redirect) {
      return <Redirect to={'/success'} />
    } else {
      return (
        <div className="container" style={{ paddingBottom: '30vh' }}>
          <div className="container mt-4 mb-2 welcome-text">
            <h3 style={{ minHeight: '2em' }}>PAYMENT</h3>
            <h1>
              NZD{' '}
              {total.toLocaleString(navigator.language, {
                minimumFractionDigits: 2,
              })}{' '}
            </h1>
            <h4>Pay via card</h4>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              setToken={(arg) => this.setToken(arg)}
              refreshTxnId={() => this.refreshTxnId()}
              total={total}
              txnId={txnId}
              processing={processing}
            />
          </Elements>
          <div style={{ color: 'red' }}>{this.state.err}</div>
          <button
            type="button"
            className="btn btn btn-outline-danger mx-auto my-2"
            onClick={() => this.processPay()}
          >
            Pay at the Restaurant
          </button>
        </div>
      )
    }
  }
}
