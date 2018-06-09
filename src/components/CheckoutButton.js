import {Button, View} from '.';

export default props => <View>
    <div className="text-center group full-width cb">
        <select className="field cb--select">
            <option value="" style={{display: 'none'}}>Choose payment method</option>
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