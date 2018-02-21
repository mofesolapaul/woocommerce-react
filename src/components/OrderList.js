import React from 'react'
import Head from 'next/head'
import css from '../../styles/vars'
import {Cart} from '../stores'
import actions from '../actions'
import {bindToThis, moneyFormat} from '../constants'
import {OrderItem} from '.'

// show more
const OkBtn = ({clickHandler, finished}) => <div className="text-center">
    <a onClick={finished? null:clickHandler} className={`btn sleek-btn green no-shadow`}>Continue</a>
</div>

export default class OrderList extends React.Component {
    constructor(props) {
        super(props)
        this.state = { total: Cart.getTotal() }
        
        // bind
        bindToThis(this, 'updateState')
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
            total: Cart.getTotal(),
        })
        if (Cart.isEmpty()) this.props.dismissHandler()
    }
    actionHandler(type, data) {
        switch (type) {
            case 'order.qty.change':
                if (!data.el.value || data.el.value < 1) data.el.value = 1;
                else actions.updateQty(data.id, data.el.value)
                break;
            case 'order.delete':
                actions.deleteOrder(data.id)
                break;
        }
    }
    render() {
        const items = this.props.items.map(t => <OrderItem key={t.product.id} item={t} actionHandler={this.actionHandler} />)
        return <div className="OrderPreview">
            <Head>
                <title>SmoothieExpress: Order Review</title>
            </Head>

            <div className="flex col">
                <h1 className="font-sourcesans">Order Review
                    <a className="close" onClick={this.props.dismissHandler}>{`\u00d7`}</a>
                </h1>
                <div className="wrapper flex">
                    <div className="summary">
                        <div className="content relative">
                            <h4 className="summary-heading">Summary</h4>
                            <ul>
                                <li>
                                    <strong className="subheading">Subtotal</strong>
                                    <span className="price">{`\u20A6`}{moneyFormat(this.state.total)}</span></li>
                                <li>
                                    <strong className="subheading">Total</strong>
                                    <span className="price">{`\u20A6`}{moneyFormat(this.state.total)}</span></li>
                            </ul>
                        </div>
                        <OkBtn />
                    </div>
                    <div className="list">{items}</div>
                </div>
            </div>

            {/* styles */}
            <style jsx>{`
                @keyframes drawUp {
                    to { bottom: 0 }
                }
                .OrderPreview {
                    background: ${css.colors.ultrawhite};
                    padding: 2rem 5%;
                    box-shadow: rgba(82,89,101,.25) 0px -2px 8px 3px;
                    position: fixed;
                    overflow: auto;
                    width: 100%;
                    left: 0;
                    z-index: 999;
                    transition: .25s ease-in-out;
                    height: 100%;
                    bottom: -100%;
                    animation: drawUp ease-in .25s both;
                }
                @media screen and (min-width: 720px) {
                    .OrderPreview {
                        height: 60%;
                        bottom: -65%;
                        animation: drawUp ease-in .25s both;
                    }
                    .list {
                        margin-right: 1rem;
                    }
                }
                .close {
                    font-weight: 100;
                    border: none;
                    opacity: .4;
                    float: right;
                    padding: 0 .5rem;
                    cursor: pointer;
                }
                .close:hover {
                    opacity: .8;
                }

                .flex {
                    height: 100%;
                }
                .wrapper {
                    flex-grow: 1;
                }
                @media screen and (min-width: 720px) {
                    .wrapper {
                        flex-direction: row-reverse;
                    }
                    .summary {
                        width: 30%;
                        position: relative;
                        padding-left: .5rem;
                    }
                }
                .summary > .content::before {
                    content: '';
                    height: 1px;
                    width: 100%;
                    background: ${css.colors.orchidash};
                    margin: auto;
                    position: absolute;
                    display: block;
                    bottom: 0;
                }
                .summary {
                    text-align: right;
                }
                .summary-heading {
                    text-transform: uppercase
                }
                @media screen and (max-width: 719px) {
                    .wrapper {
                        flex-direction: column;
                    }
                    .summary-heading {
                        display: none;
                    }
                    .summary {
                        padding-bottom: 1rem;
                    }
                    .list {
                        padding-top: .5rem;
                    }
                }
                .subheading {
                    float: left;
                }
                .summary li {
                    padding: .5rem 0
                }

                // list
                .list {
                    flex-grow: 1;
                    overflow-y: auto;
                }
            `}</style>
        </div>
    }
}