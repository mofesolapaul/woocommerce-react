import css from '../../styles/vars';
import {View} from './';

export default ({category, actionHandler, product, orderItem}) => category? <View>
    <span className="btn sleek-btn extras-label font-primary"
        onClick={e => actionHandler('extras.show', {category, product: orderItem})}>
        Manage Extras
    </span>

    {/* style */}
    <style jsx>{`
    .extras-label {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translateX(-50%) translateY(-50%);
        margin: auto;
        display: inline-block;
        z-index: 2;
        font-size: small;
        padding: .8rem 1.2rem;
        color: ${css.colors.foreground};
        background: ${css.colors.primary};
        border-radius: 50px;
        -webkit-font-smoothing: antialiased;
    }
    `}</style>
</View>:null