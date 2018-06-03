import css from '../../styles/vars';

export default props => (
    <div className="wrapper" onClick={e => props.actionHandler('order.checkout')}>
        <div className="info">Click this label to proceed, you can edit your location later</div>
        <div className="ETA">
            <h3 className="title slim font-primary">{props.etaAddy}</h3>
            <p className="font-primary approx">approx. {props.duration} ({props.distance})</p>
        </div>

        {/* styles */}
        <style jsx>{`
            @keyframes drawUp {
                to { bottom: 0 }
            }
            @keyframes drop {
                to { top: 0 }
            }
            .wrapper {
                display: ${props.shown? 'block':'none'};
                position: absolute;
                left: 0; right: 0;
                margin: auto;
                bottom: -100%;
                animation: drawUp .5s ease-in both;
                max-width: 360px;
                width: 90%;
                text-align: center;
                cursor: pointer
            }
            .info {
                display: inline-block;
                background: ${css.colors.primary};
                color: white;
                padding: .5rem;
                max-width: 98%;
                filter: drop-shadow(0px -2px 5px rgba(0,0,0,.3));
                position: relative;
                top: 100px;
                animation: drop 1s 1s ease-in both;
            }
            .ETA {
                text-align: left;
                padding: .5rem 1rem 1rem;
                background: ${css.colors.primary}; // #461f07;
                color: #fff;
                border-radius: 4px 4px 0 0;
                filter: drop-shadow(0px -2px 5px rgba(0,0,0,.3));
                overflow: hidden;
            }
            .title {
                letter-spacing: 1px;
                margin: 0
                // text-shadow: rgba(82,89,101,.5) 1px 1px;
                color: #5d3224;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .approx {
                margin: 4px 0 0;
            }
        `}</style>
    </div>
)