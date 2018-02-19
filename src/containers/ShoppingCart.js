import React from 'react'
import {Cart} from '../stores'

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: true,
        }
    }
    componentWillMount() {
        Cart.on('order.*', this.updateState)
    }
    componentWillUnmount() {
        Cart.off('order.*', this.updateState)
    }
    updateState() {
        console.log("ShoppingCart aye!")
    }
    render() {
        return <div className="ShoppingCart">
            {!this.state.isEmpty? null:null}
        </div>
    }
}