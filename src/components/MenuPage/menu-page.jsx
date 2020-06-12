import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './menu-page.scss'

import LoadingPage from '../Loading'
import db from '../../firebase'

import addCircle from '../../content-constants/add_circle_grey_144x144.png'
import subCircle from '../../content-constants/remove_circle_grey_144x144.png'

class ShowSides extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: 0,
      price: 0,
    }
  }

  render() {
    const { item, addToOrder } = this.props
    const { quantity, price } = this.state
    return (
      <div className="item-row">
        <div className="row mb-2 ">
          <div className="col-8">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-4 mt-4 mb-2">
                {item.name}
              </div>
              <div className="col-md-2 col-sm-2 col-xs-4 mt-4 mb-2">
                {item.price}
              </div>
            </div>
            <br />
            <div className="row mx-auto">{item.description}</div>
          </div>
          <div className="col-md-2 ml-2" style={{ minHeight: '200px' }}>
            <img
              src="https://img.icons8.com/bubbles/2x/food.png"
              alt="foodimg"
            />
          </div>
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
            <span className="input-group-text" style={{ minWidth: '9rem' }}>
              {price}
            </span>
          </div>
          <div className="input-group-append" id="button-addon4">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                this.setState(
                  {
                    price: !price ? 0 : Number((price - item.price).toFixed(2)),
                    quantity: !quantity ? 0 : quantity - 1,
                  },
                  () => {
                    // console.log(quantity)
                    if (quantity >= 1) this.props.updateTotal(-item.price)
                    // something to remove order from order list
                  }
                )
              }}
            >
              {/* <img src={subCircle} className="fa-ico" alt="-" /> */}
              <i className="fa fa-angle-down" aria-hidden="true"></i>
            </button>
            <span className="input-group-text" style={{ minWidth: '2rem' }}>
              {quantity}
            </span>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={() => {
                this.setState(
                  {
                    price: Number((price + item.price).toFixed(2)),
                    quantity: quantity + 1,
                  },
                  () => {
                    console.log(quantity)
                    if (quantity >= 0) this.props.updateTotal(item.price)
                    addToOrder(item, quantity + 1)
                  }
                )
              }}
            >
              <i className="fa fa-angle-up" aria-hidden="true"></i>
            </button>
          </div>
        </div>
        <div
          className="container-sm ml-3 mr-3 my-3 shadow"
          style={item.sides ? { border: 'solid 1px' } : {}}
        >
          {item.sides ? (
            <h5 className="mx-auto pt-2 pb-2">Sides for this dish</h5>
          ) : null}
          {item.sides
            ? item.sides.map((item) => {
                return (
                  <ShowSides
                    item={item}
                    updateTotal={this.props.updateTotal}
                    addToOrder={this.props.addToOrder}
                  />
                )
              })
            : null}
        </div>
      </div>
    )
  }
}

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      order: [],
      total: 0,
      isMenuLoaded: false,
      call: 'Menu',
      // menu: [],
    }
    const updateTotal = this.updateTotal.bind(this)
    const addToOrder = this.addToOrder.bind(this)
  }

  componentDidMount() {
    //[TOFIX after testing] Calling it here is causing useless reads at every change.
    // a hack for now is to set a state

    db.collection(this.state.call)
      .doc('1234')
      .get()
      .then((doc) => {
        this.setState({
          menu: doc.data(),
        })
      })
      .then(() => {
        this.setState({ isMenuLoaded: true, call: '' })
      })
  }

  updateTotal = (val) => {
    const { total } = this.state
    this.setState({ total: Number((total + val).toFixed(2)) })
  }

  addToOrder = (dishObj, qty) => {
    const { order } = this.state
    const newEl = {
      dishObj,
      qty,
    }
    this.setState({ order: [...order, newEl] })
  }

  render() {
    if (this.state.isMenuLoaded) {
      const { menu, total, order } = this.state
      // console.log(menu)

      return (
        <div className="home-container">
          <div className="container mt-4 mb-2 welcome-text">
            <h3 style={{ minHeight: '4em' }}>MENU</h3>
            {/* menu */}
            <div className="menu mt-2 mb-2">
              <div className="menu-description text-justify">
                <h5>
                  <i>{menu.description}</i>
                </h5>
                <div className="container main-card border shadow-sm mt-4 pt-2">
                  <h4>Starters</h4>
                  <hr />
                  {menu.menuItems.starters.map((item, idx) => {
                    return (
                      <ShowSides
                        item={item}
                        key={idx}
                        updateTotal={this.updateTotal}
                        addToOrder={this.addToOrder}
                      />
                    )
                  })}
                </div>
                <div className="container main-card border shadow-sm mt-4 pt-2">
                  <h4>Main Course</h4>
                  <hr />
                  {menu.menuItems.mainCourse.map((item) => {
                    return (
                      <ShowSides
                        item={item}
                        updateTotal={this.updateTotal}
                        addToOrder={this.addToOrder}
                      />
                    )
                  })}
                </div>
                <div className="container main-card border shadow-sm mt-4 pt-2">
                  <h4>Sides</h4>
                  <hr />
                  {menu.menuItems.sides.map((item) => {
                    return (
                      <ShowSides
                        item={item}
                        updateTotal={this.updateTotal}
                        addToOrder={this.addToOrder}
                      />
                    )
                  })}
                </div>
                <div className="container main-card border shadow-sm mt-4 pt-2">
                  <h4>Beverages</h4>
                  <hr />
                  {menu.menuItems.beverages.map((item) => {
                    return (
                      <ShowSides
                        item={item}
                        updateTotal={this.updateTotal}
                        addToOrder={this.addToOrder}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
            {/* menu */}
            <div className="row shadow mx-auto mt-2 mb-2 pt-2 pb-2 pl-2 text-center border">
              Your total is ${total}
            </div>
            {/* buttons */}
            <div className="row mx-2">
              <Link to={'/review'} className="col-md-6 col-xs-8 mx-auto">
                <button
                  type="button"
                  onClick={() => this.props.setOrder(order)}
                  className="btn btn-lg btn-success col-md-6 col-xs-8 mx-auto my-2"
                >
                  VIEW CART
                </button>
              </Link>
              {/* <Link to={'/'} className="col-md-6 col-xs-8 mx-auto">
                  <button type="button" className="btn btn-lg btn-danger  my-2">
                  GO BACK
                  </button>
                </Link> */}
            </div>
            {/* buttons */}
          </div>
        </div>
      )
    } else {
      return (
        <div className="container">
          <LoadingPage />
        </div>
      )
    }
  }
}
