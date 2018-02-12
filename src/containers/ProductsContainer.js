import css from '../../styles/vars'
import {ProductsList} from '../components'

const ProductsContainer = props => (
    <div className="wrapper">
        <div className="ProductsContainer">
            {props.children}
        </div>
        <style jsx>{`
            .wrapper {
                position: relative
            }
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