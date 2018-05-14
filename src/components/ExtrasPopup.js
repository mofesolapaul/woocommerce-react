import css from '../../styles/vars'
import {View} from './'

export default ({visible, actionHandler}) => visible? <View>
    <div className="extras-curtain">
        <div className="extras-modal">
            <h3>
                Select Salad Dressing
                <a className="close" onClick={() => actionHandler(`extras.dismiss`)}>{`\u00d7`}</a>
            </h3>
        </div>
    </div>

    <style jsx>{`
    .extras-curtain {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,.3);
        z-index: 1000;
    }
    .extras-modal {
        background: ${css.colors.desertbone};
        position: absolute;
        overflow-y: auto;
        width: 90%;
        max-width: 360px;
        margin: auto;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        padding: 1rem;
        border-radius: 4px;
        filter: drop-shadow(0px 4px 6px rgba(0,0,0,.25));
    }
    `}</style>
</View>:null