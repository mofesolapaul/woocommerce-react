import css from '../../styles/vars'

export default ({clickHandler, visible}) => (
    <div className="CartIcon" onClick={clickHandler}>
        <div className="wrapper">
            <div className="icon"></div>
            <div className="price"></div>
        </div>
        <div className="frame"></div>
        {/* style */}
        <style jsx>{`
            @keyframes snap-in {
                0% { visibility: visible; transform: scale(0) }
                90% { transform: scale(1.2) }
                93% { transform: scale(0.9) } 
                98% { transform: scale(1.1) }
                100% { visibility: visible; transform: scale(1) }
            }
            .CartIcon {
                width: 64px;
                height: 64px;
                filter: drop-shadow(0px 8px 10px rgba(66,68,73,.3));
                position: fixed;
                bottom: 1.5rem;
                right: 1.5rem;
                z-index: 99;
                visibility: collapse;
                animation: snap-in .5s ease-in-out; 
                animation-fill-mode: both;
                cursor: pointer;
                overflow: hidden;
            }
            .wrapper {
                height: 100%;
            }
            .icon, .price {
                height: 100%;
                border-radius: 100%;
                background: white;
            }
            .icon {
                background: url('/static/img/cart.png') center no-repeat;
                background-size: 50%;
                background-color: ${css.colors.fallleaf};
            }
            .price {
                
            }
            .frame {
                height: 100%;
                width: 100%;
                border: 5px ${css.colors.ultrawhite} solid;
                // box-sizing: content-box;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 100%;
            }
        `}</style>
    </div>
)