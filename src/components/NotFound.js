import css from '../../styles/vars'

export default ({msg, retryHandler, visible}) => (
    !!visible?
    <div className="NotFound">
        <span className="circle"></span>
        <p>{msg||"We couldn't load them awesome smoothies, please try again"}</p>
        {!!retryHandler? <a class="btn">Retry</a>:null}

        {/* style */}
        <style jsx>{`
            .NotFound {
                padding: 3rem;
                border-radius: 16px;
                border: double thick ${css.colors.orchidash};
                width: 30%;
                max-width: 360px;
                text-align: center;
                margin: auto;
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
                content: '';
                width: 24px;
                height: 24px;
                border-radius: inherit;
                background: inherit;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                margin: auto;
                position: absolute;
            }
        `}</style>
    </div>
    :null
)