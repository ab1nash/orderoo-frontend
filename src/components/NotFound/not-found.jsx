import React from 'react'
import { Link } from 'react-router-dom'
import './not-found.scss'
// import history from '../../history'

export default function NotFound() {
  return (
    <div className="container pt-4" style={{ minHeight: '52vh' }}>
      <h3>Oops! You shouldn't be seeing this!</h3>
      <br />
      <Link to={'/'}>Click here to go back home</Link>
      <br />
    </div>
  )
}
