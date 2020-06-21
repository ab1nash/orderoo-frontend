import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './menu-page.scss'

import LoadingPage from '../Loading'
import db from '../../firebase'

import addCircle from '../../content-constants/add_circle_grey_144x144.png'
import subCircle from '../../content-constants/remove_circle_grey_144x144.png'

class ShowSides extends React.Component {
  // [order: backwards update]
  constructor(props) {
    super(props)
    this.state = {
      price: 0,
      quantity: 0,
    }
  }

  componentDidMount() {
    const { item } = this.props
    if (sessionStorage.getItem(item.name)) {
      this.setState(
        {
          quantity: Number(sessionStorage.getItem(item.name)),
        },
        () => this.setState({ price: this.state.quantity * item.price })
      )
    }
  }

  render() {
    const { item, addToOrder } = this.props
    const { quantity, price } = this.state
    return (
      <div className="item-row">
        <div className="row mb-2 ">
          <div className="col-9">
            <div className="row">
              <div className="col-5  mt-4 mb-2">{item.name}</div>
              <div className="col-4  mt-4 mb-2">$ {item.price}</div>
            </div>
            <br />
            <div className="row mx-auto">{item.description}</div>
          </div>
          {this.props.noImg ? null : (
            <div className="col-3 ">
              <img
                src="https://img.icons8.com/bubbles/2x/food.png"
                alt="foodimg"
                style={{ height: '100px' }}
              />
            </div>
          )}
        </div>
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">$</span>
            <span className="input-group-text" style={{ minWidth: '6rem' }}>
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
                    console.log(quantity)
                    if (quantity >= 1) this.props.updateTotal(-item.price)
                    // something to remove order from order list
                    addToOrder(item, quantity - 1, 'remove')
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
            ? item.sides.map((item, idx) => {
                return (
                  <ShowSides
                    item={item}
                    key={idx}
                    updateTotal={this.props.updateTotal}
                    addToOrder={this.props.addToOrder}
                    noImg={true}
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

    // do this on reload ?

    this.setState({ order: this.props.order, total: this.props.total })
  }

  updateTotal = (val) => {
    const { total } = this.state
    this.setState({ total: Number((total + val).toFixed(2)) })
  }

  // THIS WORKS. DO NOT MESS WITH THIS
  addToOrder = (dishObj, qty, add = 'add') => {
    const { order } = this.state
    const newEl = {
      dishObj,
      qty,
    }

    //save/update at local storage
    sessionStorage.setItem(dishObj.name, qty)

    if (qty === 1 && add === 'add') {
      this.setState({ order: [...order, newEl] })
    } else if (qty === 0 && add === 'remove') {
      this.setState({
        order: this.state.order.filter((order) => {
          return order.dishObj.id !== newEl.dishObj.id
        }),
      })
    } else {
      this.setState(
        {
          order: this.state.order.map((order) => {
            if (order.dishObj.id === newEl.dishObj.id) {
              order.qty = qty
            }
            return order
          }),
        },
        () => console.log(this.state.order)
      )
    }
  }

  render() {
    if (this.state.isMenuLoaded) {
      const { menu, total, order } = this.state

      return (
        <div className="home-container">
          <div className="container mt-4 mb-2 welcome-text ">
            <h3 style={{ minHeight: '1.5em' }}>MENU</h3>
            {/* menu */}
            <div className="menu mt-2 mb-2 border-top">
              <div className="menu-description text-justify">
                <p className="font-italic">{menu.description}</p>
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
                        noImg={false}
                      />
                    )
                  })}
                </div>
                <div className="container main-card border shadow-sm mt-4 pt-2">
                  <h4>Main Course</h4>
                  <hr />
                  {menu.menuItems.mainCourse.map((item, idx) => {
                    return (
                      <ShowSides
                        item={item}
                        key={idx}
                        updateTotal={this.updateTotal}
                        addToOrder={this.addToOrder}
                        noImg={false}
                      />
                    )
                  })}
                </div>
                <div className="container main-card border shadow-sm mt-4 pt-2">
                  <h4>Sides</h4>
                  <hr />
                  {menu.menuItems.sides.map((item, idx) => {
                    return (
                      <ShowSides
                        item={item}
                        key={idx}
                        updateTotal={this.updateTotal}
                        addToOrder={this.addToOrder}
                        noImg={false}
                      />
                    )
                  })}
                </div>
                <div className="container main-card border shadow-sm mt-4 pt-2">
                  <h4>Beverages</h4>
                  <hr />
                  {menu.menuItems.beverages.map((item, idx) => {
                    return (
                      <ShowSides
                        item={item}
                        key={idx}
                        updateTotal={this.updateTotal}
                        addToOrder={this.addToOrder}
                        noImg={false}
                      />
                    )
                  })}
                </div>
              </div>
            </div>
            {/* menu */}
            <div className="total-bottom">
              <div className="row shadow mx-auto mt-2 mb-2 pt-2 pb-2 pl-2 text-center border">
                Your total is ${total}
              </div>
              {/* buttons */}
              <div className="row mx-2">
                <Link to={'/review'} className="col-md-6 col-xs-8 mx-auto">
                  <button
                    type="button"
                    onClick={() => {
                      this.props.setOrder(order, total)
                    }}
                    className="btn btn-lg btn-success col-md-8 col-xs-8 mx-auto my-2"
                    disabled={total === 0 ? true : false}
                  >
                    PROCEED TO CART
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
