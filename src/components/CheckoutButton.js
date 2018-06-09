import {Button, View} from '.';
import {PAYMENT_OPTIONS} from '../constants';

export default props => <View>
    <div className="text-center group full-width cb">
        <select className="field cb--select">
            <option value="" style={{display: 'none'}}>Choose payment method</option>
            {PAYMENT_OPTIONS.map(section => <optgroup label={section.name}>
                {section.options.map(option => <option value={option.name}>{option.label}</option>)}
            </optgroup>)}
        </select>
        <Button label="Proceed" no-shadow right-curve />
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