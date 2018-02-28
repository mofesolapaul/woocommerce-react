import React from 'react'
import css from '../../styles/vars'
import actions from '../actions'
import {Cart} from '../stores'
import {bindToThis} from '../constants'
import { Loading, NotFound, Product, ProductRowDivider, ShowMoreBtn, View } from '../components'

class ProductsContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {...this.props}

        // bind
        bindToThis(this, 'updateState')
        bindToThis(this, 'actionHandler')
    }
    componentWillReceiveProps(props) {
        this.setState({
            items: props.items,
            loading: props.loading,
            notfound: props.notfound,
        })
    }
    componentWillMount() {
        Cart.on('order.*', this.updateState)
    }
    componentWillUnmount() {
        Cart.off('order.*', this.updateState)
    }
    updateState() {
        // this.setState({})
    }
    actionHandler(type, data) {
        switch (type) {
            case 'cart.button.add':
                actions.addToCart(data)
                break;
            case 'cart.button.remove':
                actions.removeFromCart(data)
                break;
        }
    }
    render() {
        let {items, _showMore, canShowMore, loading, notfound} = this.state
        return <div className="wrapper">
            <div className="ProductsContainer">
                <div className="ProductsList clearfix">
                    <View>
                        { items.map((product, index) => <View key={index}>
                            <Product _key={index} item={product} actionHandler={this.actionHandler} />
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
                    { !!items.length? <ShowMoreBtn clickHandler={_showMore} finished={!canShowMore} />:null }
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