import React, { lazy, Suspense } from 'react'
import { Router, Switch, Route } from 'react-router-dom'
import history from './history'
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
      name: '',
      email: '',
      paid: false,
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

  setPaid = () => {
    this.setState({ paid: true })
  }

  saveCreds = (name, email) => {
    this.setState({ name, email })
  }

  render() {
    const {
      table,
      menu,
      isMenuLoaded,
      order,
      total,
      name,
      email,
      paid,
    } = this.state
    if (isMenuLoaded) {
      return (
        <Router history={history}>
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
                  {!this.state.paid ? (
                    <Route
                      path="/payment"
                      render={() => (
                        <Payment
                          total={total}
                          name={name}
                          email={email}
                          order={order}
                          setPaid={this.setPaid}
                        />
                      )}
                    />
                  ) : (
                    <Route
                      path="/payment"
                      render={() => (
                        <Success
                          total={total}
                          name={name}
                          email={email}
                          order={order}
                        />
                      )}
                    />
                  )}
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
