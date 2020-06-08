import React, { useEffect } from 'react'
import { Spinner } from 'react-bootstrap'
import './loading.scss'

const containerStyle = {
  position: 'absolute',
  width: '3rem',
  height: '3rem',
  boxSizing: 'border-box',
  top: '50vh',
  left: '50vw',
}

export default function LoadingPage() {
  useEffect(() => {
    setTimeout(function () {}, 1000)
  }, [])
  return (
    <div className="container">
      <div style={containerStyle}>
        {/* <motion.span
          style={circleStyle}
          animate={{ rotate: 360 }}
          transition={spinTransition}
        /> */}
        <Spinner animation="border" variant="primary" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    </div>
  )
}
