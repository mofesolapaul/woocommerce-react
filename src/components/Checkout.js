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
    render() {
        return withCheckout(
            <Sectionizr className="Checkout">
                <Section />
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