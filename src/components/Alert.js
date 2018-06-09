import {Button, ButtonPane, View} from '.';
import css from '../../styles/vars';

export default ({title, message, actionHandler}) => <View>
    <div className="extras-curtain curtain">
        <div className="extras-modal modal">
            <h3>
                <span className="">{title}</span>
            </h3>
            <div className="well">
                {message}
            </div>
            <ButtonPane>
                <Button label="Ok" clickHandler={e => {actionHandler('alert.dismiss');}} />
            </ButtonPane>
        </div>
    </div>

    <style jsx>{`
    .well {
        padding: .5rem;
        background: rgba(0,0,0,.1);
        border-radius: 4px;
    }
    `}</style>
</View>