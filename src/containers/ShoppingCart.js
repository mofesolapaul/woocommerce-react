import React from 'react'
import {Cart} from '../stores'
import { CartIcon, OrderList } from '../components'
import {kformat} from '../constants'

const NEUTRAL = 0
const ORDER_PREVIEW = 1

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: true,
            total: 0,
            state: NEUTRAL,
        }
    }
    componentWillMount() {
        Cart.on('order.*', this.updateState.bind(this))
    }
    componentWillUnmount() {
        Cart.off('order.*', this.updateState.bind(this))
    }
    updateState() {
        this.setState({
            isEmpty: Cart.isEmpty(),
            total: Cart.getTotal(),
        })
    }
    openCart() {
        this.setState({
            state: ORDER_PREVIEW
        })
    }
    render() {
        let view = null
        switch (this.state.state) {
            case ORDER_PREVIEW:
                view = <OrderList items={Cart.getAllOrders()} />
                break;
            default:
                view = !this.state.isEmpty?
                    <CartIcon clickHandler={this.openCart.bind(this)} total={kformat(this.state.total)} />:null
                break;
        }
        return <div className="ShoppingCart">{view}</div>
    }
}