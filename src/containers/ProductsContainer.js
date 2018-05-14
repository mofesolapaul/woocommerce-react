import React from 'react'
import css from '../../styles/vars'
import actions from '../actions'
import {Cart} from '../stores'
import {bindToThis, hasExtras, ORDER_ITEM_UPDATE} from '../constants'
import { Button, ButtonPane, Loading, NotFound, Product, ProductRowDivider, View } from '../components'

class ProductsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.subscribers = {}
        this.state = {...this.props}

        // bind
        bindToThis(this, 'updateProducts')
        bindToThis(this, 'actionHandler')
        bindToThis(this, 'childSubscriber')
    }

    componentWillReceiveProps(props) {
        const {items} = props
        items.map(i => i.qty = Cart.getQty(i.id))
        this.setState({
            items: props.items,
        })
    }

    componentWillMount() {
        Cart.on('order.*', this.updateProducts)
    }

    componentWillUnmount() {
        Cart.off('order.*', this.updateProducts)
    }

    updateProducts(d) {
        if (!!d && !!d.id) {
            switch (d.id) {
                case ORDER_ITEM_UPDATE:
                    this.subscribers[d.item_id](Cart.getQty(d.item_id))
                    break;
            }
        }
    }

    // this method helps the child components - Prosucts - to subscribe to changes this container
    // feels they should know about, via callbacks
    childSubscriber(id, cb) {
        this.subscribers[id] = cb
    }

    actionHandler(type, data) {
        switch (type) {
            case 'cart.button.add':
                actions.addToCart(data)
                break;
            case 'cart.button.remove':
                actions.removeFromCart(data)
                break;
            default:
                this.props.actionHandler && this.props.actionHandler(type, data)
                break;
        }
    }
    
    render() {
        let {items} = this.state
        let {_showMore, canShowMore, loading, notfound, readonly} = this.props
        return <div className="wrapper">
            <div className="ProductsContainer">
                <div className="ProductsList clearfix">
                    <View>
                        { items.map((product, index) => <View key={index}>
                            <Product 
                                _key={index}
                                item={product}
                                hasExtras={hasExtras(product)}
                                readonly={readonly}
                                registrar={this.childSubscriber}
                                actionHandler={this.actionHandler} />
                            {(index+1)%2 || items.length-1 == index? null:<ProductRowDivider k={2} />}
                            {(index+1)%3 || items.length-1 == index? null:<ProductRowDivider k={3} />}
                            {(index+1)%4 || items.length-1 == index? null:<ProductRowDivider k={4} />}
                        </View>) }
                        <div className="clearfix"></div>
                    </View>

                    {/* ux */}
                    <Loading visible={loading} />
                    <NotFound visible={notfound} retryHandler={_showMore} />

                    {/* show more button */}
                    { !!items.length? <ButtonPane>
                        <Button clickHandler={_showMore} finished={!canShowMore} />
                    </ButtonPane>:null }
                </div>
            </div>
            <style jsx>{`
                .wrapper {
                    position: relative
                }
                .ProductsContainer {
                    background: ${css.colors.ultrawhite};
                    border-radius: 3px;
                    max-width: 1120px;
                    padding: 2rem 1rem;
                    box-shadow: rgba(82,89,101,.25) 2px 2px 5px;
                    margin: auto;
                }
                .ProductsList {
                    position: relative;
                }
            `}</style>
        </div>
    }
}

export default ProductsContainer