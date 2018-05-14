import css from '../../styles/vars'
import {View} from './'

export default ({actionHandler}) => <View onClick={e => actionHandler('extras.show')}>
    <span className="extras-label font-playfair">
        Manage
    </span>

    {/* style */}
    <style jsx>{`
    .extras-label {
        position: absolute;
        bottom: 0;
        right: left;
        display: inline-block;
        z-index: 2;
        font-size: larger;
        padding: .4rem 1.2rem;
        color: ${css.colors.ultrawhite};
        background: ${css.colors.fallleaf}
    }
    `}</style>
</View>