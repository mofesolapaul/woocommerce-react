import React from 'react'
import css from '../../styles/vars'
import actions from '../actions'
import {Cart} from '../stores'
import {bindToThis} from '../constants'
import { CartButtons, PriceDisplay, ProductImage } from './'

class Product extends React.Component{
    constructor(props) {
        super(props)
        this.state = { qty: 0 }

        // bind
        bindToThis(this, 'updateState')
        bindToThis(this, 'buttonAction')
    }
    componentWillMount() {
        Cart.on('order.*', this.updateState)
        this.setState({ qty: Cart.getQty(this.props.item.id) })
    }
    componentWillUnmount() {
        Cart.off('order.*', this.updateState)
    }
    updateState() {
        this.setState({
            qty: Cart.getQty(this.props.item.id),
        })
    }
    buttonAction(sig) {
        if (sig == 'cart.button.add') actions.addToCart(this.props.item)
        else if (sig == 'cart.button.remove') actions.removeFromCart(this.props.item)
        this.setState({ qty: Cart.getQty(this.props.item.id) })
    }
    render() {
        let {item,_key: key} = this.props
        return <div className={`Product ${key%4!=0?'shift4':''} ${key%3!=0?'shift3':''}`}>
            <div className="img-wrapper">
                <ProductImage src={item.images.length? item.images[0].src:''} />
                <PriceDisplay qty={this.state.qty} price={item.price} />
            </div>
            <div className="flex">
                <h4 className="title slim">{item.name}</h4>
                <CartButtons handler={this.buttonAction} />
            </div>
            <p className="desc" dangerouslySetInnerHTML={{ __html: item.description }}></p>

            {/* style */}
            <style global jsx>{`
                .Product:hover .img {
                    transform: scale(1.2);
                }
            `}</style>
            <style jsx>{`
                .Product {
                    float: left;
                    width: 100%;
                }
                // @media screen and (min-width: 961px) {
                //     .Product {
                //         width: calc(calc(100% / 4) - .75%);
                //     }
                //     .Product.shift4 {
                //         margin-left: 1%;
                //     }
                // }
                @media screen and (min-width: 781px) {
                    .Product {
                        width: calc(calc(100% / 3) - 1%);
                    }
                    .Product.shift3 {
                        margin-left: 1.5%;
                    }
                }
                @media screen and (min-width: 500px) and (max-width: 780px) {
                    .Product {
                        width: calc(calc(100% / 2) - 0.75%);
                    }
                    .Product:nth-of-type(even) {
                        margin-left: 1.5%;
                    }
                }
                .img-wrapper {
                    position: relative;
                    height: 240px;
                    overflow: hidden;
                    background-color: ${css.colors.wisteriasnow};
                }
                .img-wrapper::before {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    height: 100%;
                    background: rgba(255,255,255,.5);
                    transition: .5s ease-out;
                    z-index: 1;
                }
                
                .Product:hover .title {
                    color: ${css.colors.fallleaf};
                }
                .Product:hover .img-wrapper::before {
                    top: 0;
                }
                
                .flex {
                    align-items: center;
                    padding: 1rem 0;
                }
                .title {
                    color: ${css.colors.rogueblue};
                    transition: .25s ease-out;
                    margin-bottom: 0;
                    font-size: 150%;
                    flex-grow: 1;
                    margin: 0;
                }
                .desc {
                    color: ${css.colors.bluetwilight};
                }
            `}</style>
        </div>
    }
}

export default Product