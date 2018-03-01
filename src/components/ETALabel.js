import css from '../../styles/vars'

export default props => (
    <div className="ETA">
        <h3 className="title slim font-sourcesans">{props.etaAddy}</h3>
        <p className="font-sourcesans approx">approx. {props.duration} ({props.distance})</p>

        {/* styles */}
        <style jsx>{`
            @keyframes drawUp {
                to { bottom: 0 }
            }
            @keyframes drop {
                to { top: 0 }
            }
            .ETA {
                display: ${props.shown? 'block':'none'};
                position: absolute;
                left: 0; right: 0;
                margin: auto;
                padding: .5rem 1rem 1rem;
                bottom: -100%;
                animation: drawUp .5s ease-in both;
                max-width: 360px;
                width: 90%;
                background: ${css.colors.fallleaf}; // #461f07;
                color: #fff;
                border-radius: 4px 4px 0 0;
                box-shadow: rgba(0,0,0,.5) 2px 2px 5px;
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