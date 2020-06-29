import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import history from './history'
import LoadingPage from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

import './App.scss'

const Home = lazy(() => import('./components/Home'))
const MenuPage = lazy(() => import('./components/MenuPage'))
const Review = lazy(() => import('./components/Review'))
const Payment = lazy(() => import('./components/Payment2'))
const Success = lazy(() => import('./components/Success'))
const NotFound = lazy(() => import('./components/NotFound'))
const AboutUs = lazy(() => import('./components/AboutUs'))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuLoaded: false,
      table: '2',
      menu: [],
      order: [],
      total: 0,
      name: '',
      email: '',
    }
  }

  componentDidMount() {
    if (sessionStorage.getItem('total')) {
      this.setState({ total: Number(sessionStorage.getItem('total')) })
    }
    if (sessionStorage.getItem('order')) {
      this.setState({ order: JSON.parse(sessionStorage.getItem('order')) })
    }
  }

  setOrder = (order, total) => {
    this.setState({ order, total }, () => {
      sessionStorage.setItem('order', JSON.stringify(order))
      sessionStorage.setItem('total', total)
    })
  }

  saveCreds = (name, email) => {
    this.setState({ name, email }, () => {
      sessionStorage.setItem('name', name)
      sessionStorage.setItem('email', email)
    })
  }

  render() {
    const { table, menu, isMenuLoaded, order, total, name, email } = this.state

    return (
      <Router>
        <div className="App">
          <NavBar />
          <div style={{ minHeight: '45vh' }}>
            <Suspense fallback={<LoadingPage />}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Home table={table} isMenuLoaded={isMenuLoaded} />
                  )}
                />
                <Route
                  path="/menu"
                  render={() => (
                    <MenuPage
                      menu={menu}
                      order={order}
                      total={total}
                      setOrder={this.setOrder}
                    />
                  )}
                />
                <Route
                  path="/review"
                  render={() => (
                    <Review
                      order={order}
                      total={total}
                      saveCreds={this.saveCreds}
                    />
                  )}
                />
                <Route
                  path="/payment"
                  render={() => (
                    <Payment
                      total={total}
                      name={name}
                      email={email}
                      order={order}
                    />
                  )}
                />
                <Route
                  path="/success"
                  render={() => (
                    <Success
                      total={total}
                      name={name}
                      email={email}
                      order={order}
                    />
                  )}
                />
                <Route path="/about-us" render={() => <AboutUs />} />
                <Route render={() => <NotFound />} />
              </Switch>
            </Suspense>
          </div>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
