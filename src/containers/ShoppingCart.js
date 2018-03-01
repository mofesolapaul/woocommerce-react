import React from 'react'
import {Cart} from '../stores'
import actions from '../actions'
import { CartIcon, Checkout, Map, OrderList, View } from '../components'
import {bindToThis, kformat} from '../constants'

const NEUTRAL = 0
const ORDER_PREVIEW = 1
const PICK_LOCATION = 2
const FILL_CHECKOUT_FORM = 3

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
            case 'checkout.dismiss':
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
                this.setState({ state: FILL_CHECKOUT_FORM })
                break;
            case 'checkout.pay':
                console.log('Pay online', data)
                break;
            case 'checkout.finish':
                console.log('Cash on delivery', data)
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
                view = <OrderList items={Cart.getAllOrders()}
                        actionHandler={this.actionHandler}
                        total={Cart.getTotal()} />
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
            case FILL_CHECKOUT_FORM:
                view = <Checkout
                            actionHandler={this.actionHandler}
                            location={this.state.userLocation} />
                break;
            default:
                view = !this.state.isEmpty?
                    <CartIcon clickHandler={this.openCart} total={kformat(this.state.total)} />:null
                break;
        }
        return <View>
            <div className="ShoppingCart">
                {view}
                {this.state.state? <div className="blankette"></div>:null}
            </div>
            {/* styles */}
            <style jsx>{`
                @media screen and (min-width: 500px) {
                    .blankette {
                        height: 60vh;
                    }
                }
            `}</style>
        </View>
    }
}