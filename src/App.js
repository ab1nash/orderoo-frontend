import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoadingPage from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import db from './firebase'

import './App.scss'

const Home = lazy(() => import('./components/Home'))
const MenuPage = lazy(() => import('./components/MenuPage'))
const Review = lazy(() => import('./components/Review'))
const Payment = lazy(() => import('./components/Payment'))
const Success = lazy(() => import('./components/Success'))
const NotFound = lazy(() => import('./components/NotFound'))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuLoaded: 'false',
      table: '2',
      menu: [],
      order: [],
      total: 0,
    }
  }

  componentDidMount() {
    db.collection('access_test')
      .get()
      .then((snapShots) => {
        this.setState({
          menu: snapShots.docs.map((doc) => {
            return {
              id: doc.id,
              item: doc.data().item,
            }
          }),
        })
      })
      .then(() => {
        this.setState({ isMenuLoaded: true })
      })

    if (localStorage.getItem('total')) {
      this.setState({ total: Number(localStorage.getItem('total')) })
    }
    if (localStorage.getItem('order')) {
      this.setState({ order: JSON.parse(localStorage.getItem('order')) })
    }
  }

  setOrder = (order, total) => {
    this.setState({ order, total }, () => {
      localStorage.setItem('order', JSON.stringify(order))
      localStorage.setItem('total', total)
    })
  }

  render() {
    const { table, menu, isMenuLoaded, order, total } = this.state
    if (isMenuLoaded) {
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
                    render={() => <Review order={order} total={total} />}
                  />
                  <Route
                    path="/payment"
                    render={() => <Payment total={total} />}
                  />
                  <Route path="/success" render={() => <Success />} />
                  <Route render={() => <NotFound />} />
                </Switch>
              </Suspense>
            </div>
            <Footer />
          </div>
        </Router>
      )
    } else {
      return <LoadingPage />
    }
  }
}

export default App
