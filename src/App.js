import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoadingPage from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import db from './firebase'

import './App.scss'

const Home = lazy(() => import('./components/Home'))
const MenuPage = lazy(() => import('./components/MenuPage'))
const Success = lazy(() => import('./components/Success'))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMenuLoaded: 'false',
      table: '2',
      menu: [],
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
  }

  render() {
    const { table, menu, isMenuLoaded } = this.state
    if (isMenuLoaded) {
      return (
        <Router>
          <div className="App">
            <NavBar />
            <Suspense fallback={<LoadingPage />}>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <Home table={table} isMenuLoaded={isMenuLoaded} />
                  )}
                />
                <Route path="/menu" render={() => <MenuPage menu={menu} />} />
                <Route path="/success" render={() => <Success />} />
              </Switch>
            </Suspense>
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
