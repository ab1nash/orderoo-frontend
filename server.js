const express = require('express')
const compression = require('compression')
// const favicon = require('express-favicon')
const path = require('path')
const bodyParser = require('body-parser')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

const port = process.env.PORT || 8000
const app = express()
app.use(compression())
// app.use(favicon(__dirname + '/build/favicon.ico'))
// the __dirname is the current directory from where the script is running

// const paymentIntent = stripe.paymentIntents.create({
//   amount: 1099,
//   currency: 'nzd',
//   // Verify your integration in this guide by including this parameter
//   metadata: { integration_check: 'accept_a_payment' },
// })

//  Stripe mock

// Use JSON parser for all non-webhook routes
// app.use((req, res, next) => {
//   if (req.originalUrl === '/webhook') {
//     next()
//   } else {
//     bodyParser.json()(req, res, next)
//   }
// })

// app.get('/', (req, res) => {
//   res.send('Hello from API')
// })

// app.get('/public-key', (req, res) => {
//   res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY })
// })

// app.get('/product-details', (req, res) => {
//   let data = getProductDetails()
//   res.send(data)
// })

// app.post('/create-payment-intent', async (req, res) => {
//   const body = req.body
//   const productDetails = getProductDetails()

//   const options = {
//     ...body,
//     amount: productDetails.amount,
//     currency: productDetails.currency,
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create(options)
//     res.json(paymentIntent)
//   } catch (err) {
//     res.json(err)
//   }
// })

// let getProductDetails = () => {
//   return { currency: 'EUR', amount: 9900 }
// }

// // Webhook handler for asynchronous events.
// app.post(
//   '/webhook',
//   bodyParser.raw({ type: 'application/json' }),
//   async (req, res) => {
//     let data
//     let eventType
//     // Check if webhook signing is configured.
//     if (webhookSecret) {
//       // Retrieve the event by verifying the signature using the raw body and secret.
//       let event
//       let signature = req.headers['stripe-signature']

//       try {
//         event = stripe.webhooks.constructEvent(
//           req.body,
//           signature,
//           webhookSecret
//         )
//       } catch (err) {
//         console.log(`⚠️ Webhook signature verification failed.`)
//         return res.sendStatus(400)
//       }
//       // Extract the object from the event.
//       data = event.data
//       eventType = event.type
//     } else {
//       // Webhook signing is recommended, but if the secret is not configured in `config.js`,
//       // retrieve the event data directly from the request body.
//       data = req.body.data
//       eventType = req.body.type
//     }

//     if (eventType === 'payment_intent.succeeded') {
//       // Fulfill any orders, e-mail receipts, etc
//       console.log('💰 Payment received!')
//     }

//     if (eventType === 'payment_intent.payment_failed') {
//       // Notify the customer that their order was not fulfilled
//       console.log('❌ Payment failed.')
//     }

//     res.sendStatus(200)
//   }
// )

//
app.use(express.static(__dirname))
app.use(express.static(path.join(__dirname, 'build')))
app.get('/ping', function (req, res) {
  return res.send('pong')
})
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
})
