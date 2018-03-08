import React from 'react'
import css from '../../styles/vars'
import { withCheckout } from '../hoc'
import { bindToThis, pullInt, uid } from '../constants'
import { Paystack } from '../WooCommerce/Config'
import { Button, ButtonPane, PaystackButton, Section, Sectionizr, View } from '.'

export default class Checkout extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                'map.searchbox.update': props.location,
                'checkout.email': '',
            }
        }
        
        // bind
        bindToThis(this, 'actionHandler')
    }
    getShippingMethods() {
        this.actionHandler('get.shipping.methods');
    }
    actionHandler(type, data) {
        switch (type) {
            case 'map.searchbox.update':
                this.props.actionHandler(type, data)
            case 'checkout.clientname':
            case 'checkout.email':
            case 'checkout.phone':
            case 'shipping.method':
                let {form} = this.state
                form[type] = data.value
                this.setState({ form })

                if (type == 'shipping.method') {
                    let txt = data.options[data.selectedIndex].text
                    let spl = txt.split(':')
                    this.actionHandler('set.shipping.method', {
                        method: data.value,
                        cost: pullInt(spl[spl.length - 1]),
                        desc: txt,
                    })
                }
                break;
            case 'checkout.pay':
            case 'checkout.finish':
                const test = !data['map.searchbox.update'] || !data['checkout.clientname'] || !data['checkout.email'] || !data['checkout.phone']
                if (test) this.actionHandler('toast.show', {msg: "We need all these details to process your order", type: 'w'})
                else {
                    this.actionHandler('app.busy')
                    this.props.actionHandler && this.props.actionHandler(type, data)
                }
                break;
            default:
                this.props.actionHandler && this.props.actionHandler(type, data)
                break;
        }
    }
    confirmLocationView() {
        let {props} = this
        let {fieldDefaults: __} = props
        return (
            <Section>
                <div className="ConfirmLocation">
                    <div className="wrapper">
                        <div className="group">
                            <label className="label">Confirm your address</label>
                            <input className="field" type="text" defaultValue={__['map.searchbox.update']} onChange={e => this.actionHandler('map.searchbox.update', e.target)} placeholder="Where are you located?" />
                        </div>
                        <div className="group">
                            <label className="label">Your name</label>
                            <input className="field" type="text" defaultValue={__['checkout.clientname']} onChange={e => this.actionHandler('checkout.clientname', e.target)} placeholder="Put your name here" />
                        </div>
                        <div className="group">
                            <label className="label">Email address</label>
                            <input className="field" type="email" defaultValue={__['checkout.email']} onChange={e => this.actionHandler('checkout.email', e.target)} placeholder="Enter your active email address" />
                        </div>
                        <div className="group">
                            <label className="label">Phone</label>
                            <input className="field" type="text" defaultValue={__['checkout.phone']} onChange={e => this.actionHandler('checkout.phone', e.target)} placeholder="Phone number goes here" />
                        </div>
                        <div className="group">
                            <label className="label">Shipping preference</label>
                            <select name="shipping_method[0]" data-index="0" id="shipping_method_0" defaultValue={__['shipping.method']} className="field" onChange={e => this.actionHandler('shipping.method', e.target)}>
                                <option value="" style={{display: 'none'}}>Select Shipping Method</option>
                                <option value="flat_rate:22">Airport road - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:46">Ajah - 2hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:35">Amuwo-odofin - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:20">Anthony - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:48">Alausa - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:23">Ajao Estate - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:30">Apapa - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:37">Festac town - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:29">Gbagada - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:45">Igbo efon (6th roundabout) - VGC 1hr30mins: ₦800.00</option>
                                <option value="flat_rate:31">Ijora - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:44">Ikate (3rd roundabout) - Agungi 1hr-1hr 15mins: ₦600.00</option>
                                <option value="flat_rate:21">Ikeja - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:42">Ikoyi - 45mins-1hr delivery time: ₦400.00</option>
                                <option value="flat_rate:25">Ilupeju - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:39">Isolo - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:43">Lekki phase 1 - Marua (2nd roundabout) 45mins - 1hr: ₦400.00</option>
                                <option value="flat_rate:27">Magodo - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:41">Marina &amp; Lagos island - 45mins - 1hr 15mins delivery time: ₦400.00</option>
                                <option value="flat_rate:24">Mafoluku - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:19">Maryland - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:33">Ogba - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:28">Ojodu - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:32">Ogudu - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:26">Ojota - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:18">Ojuelegba - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:34">Omole - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:36">Okota - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:47">Oregun - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:17">Surulere - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:38">Satellite town - 3hrs delivery: ₦1,200.00</option>
                                <option value="flat_rate:40">Victoria island - 45mins-1hr delivery time: ₦400.00</option>
                                <option value="flat_rate:16">Yaba - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:51">Store Pick Up (20 Minutes)</option>
                            </select>
                        </div>
                        <div className="clearfix"></div>
                        <ButtonPane>
                            <PaystackButton
                                ref={btn => this.actionHandler('set.paystack.btn', btn)}
                                class="btn sleek-btn hidden"
                                text="Pay Online"
                                callback={response => this.actionHandler('payment.response', response)}
                                close={() => this.actionHandler('payment.closed')}
                                reference={uid()}
                                email={this.state.form['checkout.email']}
                                amount={this.props.total * 100}
                                paystackkey={Paystack.TestPublicKey} />
                            <Button label="Pay Online" clickHandler={e => {this.actionHandler('checkout.pay', this.state.form)}} />
                            &emsp;
                            <Button label="Pay On Delivery" clickHandler={e => {this.actionHandler('checkout.finish', this.state.form)}} />
                        </ButtonPane>
                    </div>
                </div>

                {/* styles */}
                <style jsx>{`
                    .ConfirmLocation {
                        // background: ${css.colors.rogueblue};
                        height: 100%;
                        overflow: auto;
                        // color: ${css.colors.ultrawhite};
                        padding: 1rem 2px;
                        display: flex;
                    }
                    .wrapper {
                        width: 100%;
                    }
                    .title {
                        font-weight: 100;
                        border-bottom: solid thin #fff
                        max-width: 360px;
                    }
                    .group {
                        margin-bottom: 1rem;
                    }
                    @media(min-width: 601px) {
                        .group {
                            width: calc(50% - 5px);
                            float: left;
                        }
                        .group:nth-child(even) {
                            float: right;
                        }
                    }
                    .label {
                        display: block;
                        margin-bottom: .3rem;
                        color: ${css.colors.fallleaf};
                    }
                    .field {
                        display: block;
                        box-sizing: border-box;
                        border: 1px solid ${css.colors.wisteriasnow};
                        width: 100%;
                        padding: .5rem 1rem;
                        border-radius: 3px;
                        // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                        font-size: 14px;
                        outline: none;
                        font-family: 'Playfair Display', sans-serif;
                        background-color: white;
                    }
                    select.field {
                        appearance: none;
                    }
                    ::placeholder {
                        color: rgba(0, 0, 0, 0.3);
                        font-family: 'Source Sans Pro', sans-serif;
                    }
                `}</style>
            </Section>
        )
    }
    render() {
        const PriceTag = 
            <div className="PriceTag">
                <h3 className="price-label font-sourcesans slim">{`\u20A6`}{this.props.total}</h3>

                {/* styles */}
                <style jsx>{`
                    .Center {
                        text-align: center;
                    }
                    .PriceTag {
                        background: teal;
                        color: ${css.colors.ultrawhite};
                        position: absolute;
                        padding: 0 2rem;
                        display: inline-block;
                        right: 1rem;
                        top: 0;
                        transition: .5s ease-in-out;
                    }
                    @media screen and (min-width: 720px) {
                        .PriceTag {
                            top: -42px;
                            height: 42px;
                            border-radius: 4px 4px 0 0;
                            filter: drop-shadow(0px -2px 5px rgba(0,0,0,.3));
                        }
                    }
                    @media screen and (max-width: 719px) {
                        .price-label {
                            margin: .5rem 0
                        }
                    }
                `}</style>
            </div>
        return withCheckout(
            <div className="Checkout">
                {this.confirmLocationView()}
            </div>,
            {
                page_title: 'SmoothieExpress: Checkout',
                section_name: 'checkout',
                section_header: 'Checkout',
                actionHandler: this.actionHandler,
            },
            PriceTag
        )
    }
}