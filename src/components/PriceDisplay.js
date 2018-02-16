import css from '../../styles/vars'
import {View} from './'

export default ({price, qty}) => <View>
    <div className="price-display font-playfair">
        {!!qty? <span className="qty font-sourcesans">({price} x {qty})</span>:null}
        {`\u20A6 ${price*(!qty?1:qty)||'0.00'}`}
    </div>

    {/* style */}
    <style jsx>{`
    .price-display {
        position: absolute;
        bottom: 0;
        right: 0;
        display: inline-block;
        z-index: 2;
        font-size: larger;
        padding: .4rem .8rem;
        color: ${css.colors.ultrawhite};
        background: ${!qty? css.colors.rogueblue:'teal'}
        padding-left: 1.2rem;
    }
    .qty {
        font-size: x-small;
        display: block;
        text-align: right;
    }
    `}</style>
</View>