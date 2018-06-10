import {Button, ButtonPane, View} from '.';
import css from '../../styles/vars';

export default ({price, actionHandler, moreInfo}) => <View>
    <div className="extras-curtain curtain">
        <div className="extras-modal modal">
            <h3>
                <span className="">Confirm Order</span>
            </h3>
            <div className="well">
                Your total bill is &#8358;{price}. Do you want to proceed with your order?
                {!!moreInfo && <p dangerouslySetInnerHTML={{ __html: moreInfo }}></p>}
            </div>
            <ButtonPane>
            <Button label="Proceed" clickHandler={e => {actionHandler('order.confirm');}} />
            &emsp; <Button label="Cancel" clickHandler={e => {actionHandler('order.holdon');}} />
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