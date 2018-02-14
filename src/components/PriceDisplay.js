import css from '../../styles/vars'
import {View} from './'

export default ({price}) => <View>
    <span className="price-display font-playfair">{`\u20A6 ${price||'0.00'}`}</span>

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
        background: ${css.colors.rogueblue}
        padding-left: 1.2rem;
    }
    `}</style>
</View>