const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')({ origin: true })
const app = express()

// TODO: Remember to set token using >> firebase functions:config:set stripe.token="SECRET_STRIPE_TOKEN_HERE"
const stripe = require('stripe')(functions.config().stripe.token)

// exports.testAdd = functions.firestore
//   .document('/Order/{id}')
//   .onCreate((snap, context) => {
//     const id = context.params.id
//     console.log(snap.data())
//     return snap.ref.set(
//       {
//         status: 'success',
//       },
//       { merge: true }
//     )
//   })

exports.stripeCharge = functions.firestore
  .document('Order/{id}')
  .onCreate(async (snap, context) => {
    const val = snap.data()
    const amount = val.amount
    const currency = 'nzd'
    const token = val.token
    // Charge card
    stripe.charges
      .create({
        amount,
        currency,
        description: 'test pay',
        source: token,
      })
      .then((charge) => {
        console.log('PAYMENT SUCCESSFUL')
        return snap.ref.set(
          {
            status: 'success',
          },
          { merge: true }
        )
      })
      .catch((err) => {
        console.log('ERROR')
        console.log(err)
        console.log('/ERROR')

        console.log('PAYMENT FAILED')
        return snap.ref.set(
          {
            status: 'failed',
          },
          { merge: true }
        )
      })
  })

function charge(req, res) {
  const body = JSON.parse(req.body)
  const token = body.token.id
  const amount = body.charge.amount
  const currency = body.charge.currency

  // Charge card
  stripe.charges
    .create({
      amount,
      currency,
      description: 'Firebase Example',
      source: token,
    })
    .then((charge) => {
      send(res, 200, {
        message: 'Success',
        charge,
      })
    })
    .catch((err) => {
      console.log(err)
      send(res, 500, {
        error: err.message,
      })
    })
}

function send(res, code, body) {
  res.send({
    statusCode: code,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  })
}

app.use(cors)
app.post('/', (req, res) => {
  // Catch any unexpected errors to prevent crashing
  try {
    charge(req, res)
  } catch (e) {
    console.log(e)
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    })
  }
})

// exports.charge = functions.http.onRequest(app)
// This was https
// exports.charge = functions.https.onRequest(app)
