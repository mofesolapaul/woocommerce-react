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
                        <h2 className="font-sourcesans slim title">Confirm your Location</h2>
                        <label className="label">This was the location you selected, confirm that it's alright or edit it manually</label>
                        <textarea
                            placeholder={props.location||"Where are you located?"}
                            onChange={e => props.actionHandler('map.searchbox.update', e.target)}
                            defaultValue={props.location}
                            rows="3"
                            style={{
                                display: 'block',
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                maxWidth: `480px`,
                                width: `100%`,
                                // height: `72px`,
                                marginTop: `10px`,
                                padding: `12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                            }} />
                    </div>
                    <div className="proceed"></div>
                </div>

                {/* styles */}
                <style jsx>{`
                    .ConfirmLocation {
                        background: ${css.colors.rogueblue};
                        height: 100%;
                        align-items: center;
                        overflow: auto;
                        color: ${css.colors.ultrawhite};
                        padding: 1rem;
                        display: flex;
                    }
                    .wrapper {
                        // width: 100%;
                    }
                    .title {
                        font-weight: 100;
                        border-bottom: solid thin #fff
                        max-width: 360px;
                    }
                    .proceed {
                        width: 72px;
                        height: 72px;
                        border-radius: 100%;
                        background: ${css.colors.wisteriasnow};
                        position: absolute;
                        right: 1rem;
                        border: ${css.colors.ultrawhite} thick solid;
                        box-sizing: content-box;
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