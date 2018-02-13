import React from 'react'
import css from '../../styles/vars'
import {View} from './'

export default class CartButton extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return <View>
            <a className="btn cart-btn left">{`\u2013`}</a>
            <a className="btn cart-btn right">+</a>

            {/* style */}
            <style jsx>{`
            .cart-btn {
                width: 28px;
                height: 28px;
                line-height: 24px; 
                text-align: center; 
                font-size: 16px;
            }
            .cart-btn:hover {
                background: ${css.colors.fallleaf};
                color: ${css.colors.ultrawhite};
                border-color: transparent;
            }
            .left {
                border-right: none;
                border-radius: 50% 0 0 50%;
            }
            .right {
                border-radius: 0 50% 50% 0;
            }
            `}</style>
        </View>
    }
}