import {Button, View} from '.';
import {PAYMENT_OPTIONS, uid} from '../constants';

export default ({actionHandler}) => <View>
    <div className="text-center group full-width cb">
        <select className="field cb--select" onChange={e => actionHandler('payment.option', e.target.value)}>
            <option value="" style={{display: 'none'}}>Choose payment method</option>
            {PAYMENT_OPTIONS.map(section => <optgroup label={section.name} key={uid()}>
                {section.options.map(option => <option value={option.intent} key={uid()}>{option.label}</option>)}
            </optgroup>)}
        </select>
        <Button label="Proceed" clickHandler={() => actionHandler('checkout.do')} no-shadow right-curve />
    </div>

    {/* style */}
    <style jsx>{`
        .cb {
            display: flex;
            flex: 1;
            max-width: 380px;
            margin: auto;
        }
        .cb--select {
            -webkit-appearance: button;
            border-radius: 100px 0 0 100px;
        }
    `}</style>
</View>