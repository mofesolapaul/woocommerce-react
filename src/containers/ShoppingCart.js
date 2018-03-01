import React from 'react'
import {Cart} from '../stores'
import actions from '../actions'
import { CartIcon, Map, OrderList, View } from '../components'
import {bindToThis, kformat} from '../constants'

const NEUTRAL = 0
const ORDER_PREVIEW = 1
const PICK_LOCATION = 2

export default class ShoppingCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isEmpty: Cart.isEmpty(),
            total: Cart.getTotal(),
            state: NEUTRAL,
            mapCenter: null,
            mapSearchBox: null,
            userLocation: '',
        }

        // bind
        bindToThis(this, 'updateState')
        bindToThis(this, 'openCart')
        bindToThis(this, 'actionHandler')
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
    actionHandler(type, data) {
        switch (type) {
            case 'order.checkout.pick_location':
                this.setState({ state: PICK_LOCATION })
                break;
            case 'cart.dismiss':
                this.setState({ state: NEUTRAL })
                break;
            case 'order.qty.change':
                actions.updateQty(data.id, data.value)
                break;
            case 'order.delete':
                actions.deleteOrder(data.id)
                break;
            case 'location.dismiss':
                this.openCart()
                break;
            case 'map.center':
                this.setState({mapCenter: data})
                this.state.mapSearchBox && this.setState({userLocation: this.state.mapSearchBox.value || ''})
                break;
            case 'map.searchbox.update':
                this.setState({mapSearchBox: data})
                break;
            case 'map.destination.meta':
                this.setState({
                    mapDestinationDistance: data.distance,
                    mapDestinationDuration: data.duration,
                    mapDirectionEndAddress: data.end_address,
                })
                data.end_address && this.setState({userLocation: data.end_address})
                break;
            case 'order.checkout':
                console.log('order.checkout')
                break;
        }
    }
    openCart() {
        this.setState({ state: ORDER_PREVIEW })
    }
    render() {
        let view = null
        switch (this.state.state) {
            case ORDER_PREVIEW:
                view = <View>
                        <OrderList items={Cart.getAllOrders()}
                            actionHandler={this.actionHandler}
                            total={Cart.getTotal()} />
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
            case PICK_LOCATION:
                view = <Map
                            actionHandler={this.actionHandler}
                            center={this.state.mapCenter}
                            lastLocation={this.state.userLocation}
                            distance={this.state.mapDestinationDistance}
                            duration={this.state.mapDestinationDuration}
                            etaAddy={this.state.mapDirectionEndAddress} />
                break;
            default:
                view = !this.state.isEmpty?
                    <CartIcon clickHandler={this.openCart} total={kformat(this.state.total)} />:null
                break;
        }
        return <div className="ShoppingCart">{view}</div>
    }
}