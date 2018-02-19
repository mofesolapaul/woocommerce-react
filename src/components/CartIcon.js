import css from '../../styles/vars'

export default ({clickHandler, visible}) => (
    <div className="CartIcon">
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
                width: 54px;
                height: 54px;
                border-radius: 100%;
                border: thick ${css.colors.ultrawhite} solid;
                background: url('/static/img/cart.png') center no-repeat;
                background-size: 50%;
                background-color: ${css.colors.fallleaf};
                filter: drop-shadow(0px 8px 10px rgba(66,68,73,.3));
                position: fixed;
                bottom: 1.5rem;
                right: 1.5rem;
                z-index: 99;
                visibility: collapse;
                animation: snap-in .5s ease-in-out; 
                animation-fill-mode: both;
                box-sizing: content-box;
                cursor: pointer;
            }
        `}</style>
    </div>
)