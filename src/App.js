import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoadingPage from './components/Loading'
import NavBar from './components/NavBar'
import Footer from './components/Footer'

import './App.scss'

const Home = lazy(() => import('./components/Home'))

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      table: '2',
    }
  }
  render() {
    const { table } = this.state
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Suspense fallback={<LoadingPage />}>
            <Switch>
              <Route exact path="/" render={() => <Home table={table} />} />
            </Switch>
          </Suspense>
          <Footer />
        </div>
      </Router>
    )
  }
}

export default App
