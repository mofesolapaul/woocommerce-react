import css from '../../styles/vars'

export default ({clickHandler, visible}) => (
    <div className="CartIcon">
        {/* style */}
        <style jsx>{`
            .CartIcon {
                width: 48px;
                height: 48px;
                border-radius: 100%;
                border: thick ${css.colors.ultrawhite} solid;
                background: url('/static/img/cart.png') center no-repeat;
                background-size: 70%;
                background-color: ${css.colors.fallleaf};
                filter: drop-shadow(0px 8px 10px rgba(66,68,73,.3))
            }
        `}</style>
    </div>
)