import css from '../../styles/vars';

// clearfixes for proper layout
export default p => <span className={`product-row-divider clear${p.k}`}>
    <style jsx>{`
        .product-row-divider::before {
            content: '';
            height: 1px;
            width: 70%;
            background: ${css.colors.orchidash};
            margin: auto;
            position: relative;
            display: block;
        }
        .product-row-divider {
            display: none;
            padding: 1rem 1rem 2.5rem;
            position: relative;
        }
        @media screen and (min-width: 781px) {
            .clear3 {
                clear: both;
                display: block;
            }
        }
        @media screen and (min-width: 500px) and (max-width: 780px) {
            .clear2 {
                clear: both;
                display: block;
            }
        }
    `}</style>
</span>