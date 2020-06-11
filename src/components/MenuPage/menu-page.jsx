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
    const { item } = this.props
    const { quantity, price } = this.state
    return (
      <div className="item-row">
        <div className="row mb-2 ">
          <div className="col-md-6 col-sm-6 col-xs-4 mt-4 mb-2">
            {item.name}
          </div>
          <div className="col-md-2 col-sm-6 col-xs-4 mt-4 mb-2">
            {item.price}
          </div>
          <div className="col-md-2 ml-2" style={{ minHeight: '200px' }}>
            <img
              src="https://img.icons8.com/bubbles/2x/food.png"
              alt="foodimg"
            />
          </div>
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text">$</span>
            <span class="input-group-text" style={{ minWidth: '9rem' }}>
              {price}
            </span>
          </div>
          <div class="input-group-append" id="button-addon4">
            <button
              class="btn btn-outline-secondary"
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
                  }
                )
              }}
            >
              {/* <img src={subCircle} className="fa-ico" alt="-" /> */}
              <i class="fa fa-angle-down" aria-hidden="true"></i>
            </button>
            <span class="input-group-text" style={{ minWidth: '2rem' }}>
              {quantity}
            </span>
            <button
              class="btn btn-outline-secondary"
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
                  }
                )
              }}
            >
              <i class="fa fa-angle-up" aria-hidden="true"></i>
            </button>
          </div>
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
      // menu: [],
    }
    const updateTotal = this.updateTotal.bind(this)
  }

  componentDidMount() {
    db.collection('Menu')
      .doc('1234')
      .get()
      .then((doc) => {
        this.setState({
          menu: doc.data(),
        })
      })
      .then(() => {
        this.setState({ isMenuLoaded: true })
      })
  }

  updateTotal = (val) => {
    const { total } = this.state
    this.setState({ total: Number((total + val).toFixed(2)) })
  }

  render() {
    if (this.state.isMenuLoaded) {
      const { menu, total } = this.state
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
                  <h4>Sides</h4>
                  <hr />
                  {menu.menuItems.sides.map((item) => {
                    return (
                      <ShowSides item={item} updateTotal={this.updateTotal} />
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
                  className="btn btn-lg btn-success col-md-6 col-xs-8 mx-auto my-2"
                  onClick={this.nextPage}
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
