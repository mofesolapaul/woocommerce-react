import React from 'react'
import {Cart} from '../stores'
import {CartIcon} from '../components'

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: true,
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
            isEmpty: Cart.isEmpty()
        })
        console.log(this.state.isEmpty)
    }
    render() {
        return <div className="ShoppingCart">
            {!this.state.isEmpty? <CartIcon />:null}
        </div>
    }
}