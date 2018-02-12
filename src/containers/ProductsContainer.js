import css from '../../styles/vars'

const ProductsContainer = () => (
    <div className="ProductsContainer">
        <style jsx>{`
            .ProductsContainer {
                background: ${css.colors.ultrawhite};
                border-radius: 3px;
                max-width: 1120px;
                padding: 2rem 1rem;
                box-shadow: rgba(82,89,101,.25) 2px 2px 5px;
                margin: auto;
            }
        `}</style>
    </div>
)

export default ProductsContainer