import React from 'react'
import css from '../../styles/vars'
import {bindToThis} from '../constants'
import { CartButtons, ExtrasLabel, PriceDisplay, ProductImage } from './'

class Product extends React.Component{
    constructor(props) {
        super(props)
        this.state = {
            qty: props.item.qty,
            showExtras: false
        }

        // bind
        bindToThis(this, 'actionHandler')
        bindToThis(this, 'updateQty')

        // register for qty updates
        props.registrar && props.registrar(props.item.id, this.updateQty)
    }
    actionHandler(type, data) {
        let {qty} = this.state
        switch (type) {
            case 'cart.button.add':
                // show the extras popup
                if (this.props.hasExtras && !this.state.qty);
                
                this.setState({ qty: qty+1 })
                this.props.actionHandler(type, this.props.item)
                break;
            case 'cart.button.remove':
                if (qty != 0) {
                    this.setState({ qty: qty-1 })
                    this.props.actionHandler(type, this.props.item)
                }
                break;
            case 'extras.show':
                alert('Showing Extras')
                break;
            default:
                this.props.actionHandler && this.props.actionHandler(type, data)
                break;
        }
    }
    updateQty(val) {
        this.setState({ qty: val })
    }
    render() {
        let {item,_key: key} = this.props
        return <div className={`Product ${key%4!=0?'shift4':''} ${key%3!=0?'shift3':''}`}>
            <div className="img-wrapper">
                <ProductImage src={item.images.length? item.images[0].src:''} />
                {!!this.state.qty && <ExtrasLabel visible={this.props.hasExtras} actionHandler={this.actionHandler} />}
                <PriceDisplay qty={this.state.qty} price={item.price} />
            </div>
            <div className="flex">
                <h4 className="title slim">{item.name}</h4>
                {this.props.readonly? null:<CartButtons handler={this.actionHandler} />}
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