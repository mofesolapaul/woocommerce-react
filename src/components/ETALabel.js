import css from '../../styles/vars'

export default props => (
    <div className="ETA">
        <h5 className="title">ETA</h5>

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
                padding: .5rem;
            }
            @media screen and (max-width: 719px) {
                .ETA {
                    bottom: -100%;
                    animation: drawUp .25s ease-in-out;
                }
            }
            @media screen and (min-width: 720px) {
                .ETA {
                    top: -100%;
                    animation: drop .25s ease-in-out;
                }
            }
        `}</style>
    </div>
)