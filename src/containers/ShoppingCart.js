import React from 'react'
import {Cart} from '../stores'
import { CartIcon, OrderList, View } from '../components'
import {kformat} from '../constants'

const NEUTRAL = 0
const ORDER_PREVIEW = 1

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: Cart.isEmpty(),
            total: Cart.getTotal(),
            state: NEUTRAL,
        }

        // bind
        this.updateState = this.updateState.bind(this)
    }
    componentWillMount() {
        Cart.on('order.*', this.updateState)
    }
    componentWillUnmount() {
        Cart.off('order.*', this.updateState)
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
    closeCart() {
        this.setState({
            state: NEUTRAL
        })
    }
    render() {
        let view = null
        switch (this.state.state) {
            case ORDER_PREVIEW:
                view = <View>
                        <OrderList items={Cart.getAllOrders()}
                            dismissHandler={this.closeCart.bind(this)} />
                        <div className="blankette"></div>

                        {/* styles */}
                        <style jsx>{`
                            @media screen and (min-width: 500px) {
                                .blankette {
                                    height: 60vh;
                                }
                            }
                        `}</style>
                    </View>
                break;
            default:
                view = !this.state.isEmpty?
                    <CartIcon clickHandler={this.openCart.bind(this)} total={kformat(this.state.total)} />:null
                break;
        }
        return <div className="ShoppingCart">{view}</div>
    }
}