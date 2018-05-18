import css from '../../styles/vars';
import {View} from './';

export default ({category, actionHandler, productId}) => category? <View>
    <span className="btn sleek-btn extras-label font-sourcesans"
        onClick={e => actionHandler('extras.show', {category, productId, actionHandler})}>
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
        font-size: larger;
        padding: .8rem 1.2rem;
        color: ${css.colors.ultrawhite};
        background: ${css.colors.fallleaf};
        border-radius: 50px;
        -webkit-font-smoothing: antialiased;
    }
    `}</style>
</View>:null