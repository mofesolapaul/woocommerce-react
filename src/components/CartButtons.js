import React from 'react';
import css from '../../styles/vars';
import {View} from './';
import {bindToThis} from '../constants';

export default ({handler, solo}) => <View>
    {!solo && <View>
        <a className="btn cart-btn left" onClick={() => handler('cart.button.remove')}>{`\u2013`}</a>
        <a className="btn cart-btn right" onClick={() => handler('cart.button.add')}>+</a>
    </View>}
    {!!solo && <a className="btn cart-btn solo-btn" onClick={() => handler('cart.button.solo_add')}>Add to cart</a>}

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
        background: ${css.colors.primarydark};
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
        background: ${css.colors.primarydark};
        box-shadow: rgba(82,89,101,.25) 1px 2px 6px inset;
        user-select: none;
    }
    .solo-btn {
        width: auto;
        border-radius: 20px;
        text-transform: uppercase;
        font-size: smaller;
        padding: 2px 6px;
        font-weight: bolder;
    }
    `}</style>
</View>;