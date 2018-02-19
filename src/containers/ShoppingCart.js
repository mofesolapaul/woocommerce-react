import React from 'react'
import {Cart} from '../stores'
import {CartIcon} from '../components'
import {kformat} from '../constants'

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: true,
            total: 0
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
        console.log(this.state)
    }
    openCart() {
        console.log('Cart Open');
    }
    render() {
        return <div className="ShoppingCart">
            {!this.state.isEmpty? <CartIcon clickHandler={this.openCart.bind(this)}
                                    total={kformat(this.state.total)} />:null}
        </div>
    }
}