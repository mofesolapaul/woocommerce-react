import {Button, View} from '.';

export default props => <View>
    <div className="text-center group full-width cb">
        <select className="field cb--select"></select>
        <Button label="Pay Online" no-shadow right-curve />
    </div>

    {/* style */}
    <style jsx>{`
        .cb {
            display: flex;
            flex: 1;
            max-width: 380px;
        }
        .cb--select {
            -webkit-appearance: button;
            border-radius: 50px 0 0 50px;
        }
    `}</style>
</View>