import css from '../../styles/vars'
import { View } from '../components'
import { Product } from '.';

// clearfixes for proper layout
const Clear = p => <span className={`product-row-divider clear${p.k}`}></span>

const ProductsList = ({items}) => (
    <div className="ProductsList clearfix">
        { items.map((product, index) => <View key={index}>
            <Product _key={index} item={product} />
            {(index+1)%2 || items.length-1 == index? null:<Clear k={2} />}
            {(index+1)%3 || items.length-1 == index? null:<Clear k={3} />}
            {(index+1)%4 || items.length-1 == index? null:<Clear k={4} />}
        </View>) }
        <style global jsx>{`
            .ProductsList {}
            .product-row-divider {
                display: none;
                padding: 1rem 1rem 2.5rem;
                position: relative;
            }
            .product-row-divider::before {
                content: '';
                height: 1px;
                width: 70%;
                background: ${css.colors.orchidash};
                margin: auto;
                position: relative;
                display: block;
            }
            @media screen and (min-width: 961px) {
                .clear4 {
                    clear: both;
                    display: block;
                }
            }
            @media screen and (min-width: 781px) and (max-width: 960px) {
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
    </div>
)

export default ProductsList