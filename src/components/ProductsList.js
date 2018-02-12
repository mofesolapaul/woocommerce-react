import css from '../../styles/vars'
import { Product } from '.';

const ProductsList = ({items}) => (
    <div className="ProductsList clearfix">
        { items.map((product, index) => <Product key={index} _key={index} item={product} />) }
        <style jsx>{`
            .ProductsList {}
        `}</style>
    </div>
)

export default ProductsList