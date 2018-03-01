import React from 'react'
import { withCheckout } from '../hoc'
import { bindToThis } from '../constants'
import { View } from '.'

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
            <View>
                {null}
            </View>,
            {
                page_title: 'SmoothieExpress: Checkout',
                section_name: 'checkout',
                section_header: 'Checkout',
                actionHandler: this.actionHandler,
            }
        )
    }
}