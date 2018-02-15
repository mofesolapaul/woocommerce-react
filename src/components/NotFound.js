import css from '../../styles/vars'

export default ({msg, retryHandler}) => (
    <div className="NotFound">
        <span className="circle"></span>
        <p>{msg||"We couldn't load them awesome smoothies, please try again"}</p>
        {!!retryHandler? <a class="btn">Retry</a>:null}

        {/* style */}
        <style jsx>{`
            .NotFound {
                padding: 3rem;
                border-radius: 8px;
                border: dashed thick ${css.colors.bluetwilight};
                width: 30%;
                max-width: 360px;
                text-align: center;
            }
            .circle {
                display: block;
                width: 48px;
                height: 48px;
                border-radius: 100%;
                background: rgba(145,158,161,.5);
                position: relative;
                margin: 1rem auto;
            }
            .circle::before {
                width: 24px;
                height: 24px;
                border-radius: inherit;
                background: inherit;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
            }
        `}</style>
    </div>
)