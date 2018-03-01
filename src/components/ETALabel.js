import css from '../../styles/vars'

export default props => (
    <div className="ETA">
        <h4 className="title font-sourcesans">ETA</h4>
        <p className="font-playfair approx">Approx. {props.duration} ({props.distance})</p>

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
                padding: .5rem .5rem 1rem;
                bottom: -100%;
                animation: drawUp .5s ease-in both;
                max-width: 360px;
                width: 90%;
                background: ${css.colors.fallleafdark};
                color: ${css.colors.ultrawhite};
                border-radius: 4px 4px 0 0;
            }
            .title {
                letter-spacing: 1px;
                margin: 0
            }
            .approx {
                margin: 4px 0 0;
            }
        `}</style>
    </div>
)