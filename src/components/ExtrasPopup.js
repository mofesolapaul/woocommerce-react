import css from '../../styles/vars'
import {View} from './'

export default () => visible? <View>
    <div className="extras-curtain">
    </div>

    <style jsx>{`
    .extras-curtain {
        position: fixed;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,.3);
    }
    `}</style>
</View>:null