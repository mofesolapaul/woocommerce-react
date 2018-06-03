import React from 'react';
import css from '../../styles/vars';
import {View} from './';
import {bindToThis} from '../constants';

export default class CartButtons extends React.Component {
    constructor(props) {
        super(props);

        // bind
        bindToThis(this, 'add');
        bindToThis(this, 'remove');
    }
    add() {
        this.props.handler && this.props.handler('cart.button.add');
    }
    remove() {
        this.props.handler && this.props.handler('cart.button.remove');
    }
    render() {
        return <View>
            {!this.props.solo && <View>
                <a className="btn cart-btn left" onClick={this.remove}>{`\u2013`}</a>
                <a className="btn cart-btn right" onClick={this.add}>+</a>
            </View>}

            {!!this.props.solo && <a className="btn cart-btn solo-btn" onClick={this.add}>Add</a>}

            {/* style */}
            <style jsx>{`
            .cart-btn {
                width: 28px;
                height: 28px;
                line-height: 24px;
                text-align: center; 
                font-size: 16px;
                transition: none;
                padding: 0;
            }
            .cart-btn:hover {
                background: ${css.colors.fallleaf};
                color: ${css.colors.background};
                border-color: transparent;
            }
            .left {
                border-right: none;
                border-radius: 50% 0 0 50%;
            }
            .right {
                border-radius: 0 50% 50% 0;
            }
            .cart-btn:active {
                background: ${css.colors.fallleafdark};
                box-shadow: rgba(82,89,101,.25) 1px 2px 6px inset;
                user-select: none;
            }
            .solo-btn {
                width: auto;
                border-radius: 50%;
                text-transform: uppercase;
                font-size: smaller;
            }
            `}</style>
        </View>;
    }
}