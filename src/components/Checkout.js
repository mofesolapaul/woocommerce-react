import React from 'react'
import css from '../../styles/vars'
import { withCheckout } from '../hoc'
import { bindToThis } from '../constants'
import { Section, Sectionizr, View } from '.'

export default class Checkout extends React.PureComponent {
    constructor(props) {
        super(props)
        
        // bind
        bindToThis(this, 'actionHandler')
    }
    componentDidMount() {}
    actionHandler(type, data) {
        this.props.actionHandler(type, data)
    }
    confirmLocationView() {
        let {props} = this
        return (
            <Section>
                <div className="ConfirmLocation">
                    <div className="wrapper">
                        <div className="group">
                            <label className="label">Confirm your address</label>
                            <input className="field" type="text" defaultValue={props.location} onChange={e => props.actionHandler('map.searchbox.update', e.target)} placeholder="Where are you located?" />
                        </div>
                        <div className="group">
                            <label className="label">Your name</label>
                            <input className="field" type="text" defaultValue="" onChange={e => props.actionHandler('checkout.clientname', e.target)} placeholder="Put your name here" />
                        </div>
                        <div className="group">
                            <label className="label">Email address</label>
                            <input className="field" type="email" defaultValue="" onChange={e => props.actionHandler('checkout.email', e.target)} placeholder="Enter your active email address" />
                        </div>
                        <div className="group">
                            <label className="label">Phone</label>
                            <input className="field" type="text" defaultValue="" onChange={e => props.actionHandler('checkout.email', e.target)} placeholder="Phone number goes here" />
                        </div>
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
        return withCheckout(
            <Sectionizr className="Checkout">
                {this.confirmLocationView()}
                <Section />

                {/* styles */}
                <style jsx>{`
                    .Checkout {
                        background: ${css.colors.rogueblue}
                    }
                `}</style>
            </Sectionizr>,
            {
                page_title: 'SmoothieExpress: Checkout',
                section_name: 'checkout',
                section_header: 'Checkout',
                actionHandler: this.actionHandler,
            }
        )
    }
}