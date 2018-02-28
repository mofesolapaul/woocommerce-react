import React from 'react'
import css from '../../styles/vars'
import {Cart} from '../stores'
import actions from '../actions'
import {bindToThis, moneyFormat} from '../constants'
import {OrderItem, View} from '.'
import {withCheckout} from '../hoc'

// show more
const OkBtn = ({clickHandler, finished}) => <div className="text-center">
    <a onClick={() => finished? null:clickHandler('order.checkout.pick_location')} className={`btn sleek-btn green no-shadow`}>Continue</a>
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
        if (Cart.isEmpty()) this.actionHandler('cart.dismiss')
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
            default:
                this.props.actionHandler && this.props.actionHandler(type, data)
                break
        }
    }
    render() {
        const items = this.props.items.map(t => <OrderItem key={t.product.id} item={t} actionHandler={this.actionHandler} />)
        let view = <View>
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
                <OkBtn clickHandler={this.actionHandler} />
            </div>
            <div className="list">{items}</div>

            {/* styles */}
            <style jsx>{`
                @media screen and (min-width: 720px) {
                    .list {
                        margin-right: 1rem;
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
        </View>
        view = withCheckout(view, {
            page_title: 'SmoothieExpress: Order Review',
            section_name: 'cart',
            section_header: 'Order Review',
        })

        return view
    }
}