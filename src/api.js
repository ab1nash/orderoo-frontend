const createPaymentIntent = (options) => {
  // link to firebase function
  return window
    .fetch(`/create-payment-intent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    })
    .then((res) => {
      if (res.status === 200) {
        return res.json()
      } else {
        return null
      }
    })
    .then((data) => {
      if (!data || data.error) {
        console.log('API error3:', { data })
        throw new Error('PaymentIntent API Error3')
      } else {
        return data.client_secret
      }
    })
}

// const getProductDetails = (options) => {
//   return window
//     .fetch(`/product-details`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((res) => {
//       if (res.status === 200) {
//         return res.json()
//       } else {
//         return null
//       }
//     })
//     .then((data) => {
//       if (!data || data.error) {
//         console.log('API error2:', { data })
//         throw Error('API Error2')
//       } else {
//         return data
//       }
//     })
// }

// const getPublicStripeKey = (options) => {
//   return window
//     .fetch(`/public-key`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//     .then((res) => {
//       if (res.status === 200) {
//         return res.json()
//       } else {
//         return null
//       }
//     })
//     .then((data) => {
//       if (!data || data.error) {
//         console.log('API error1:', { data })
//         throw Error('API Error1')
//       } else {
//         return data.publicKey
//       }
//     })
// }

const api = {
  createPaymentIntent,
  // getPublicStripeKey: getPublicStripeKey,
  // getProductDetails: getProductDetails,
}

export default api
