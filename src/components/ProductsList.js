import css from '../../styles/vars'
import { View } from '../components'
import { Product } from '.';

// clearfixes for proper layout
const Clear = p => <span className={`products-divider clear${p.k}`}></span>

const ProductsList = ({items}) => (
    <div className="ProductsList clearfix">
        { items.map((product, index) => <View key={index}>
            <Product _key={index} item={product} />
            {(index+1)%2? null:<Clear k={2} />}
            {(index+1)%3? null:<Clear k={3} />}
            {(index+1)%4? null:<Clear k={4} />}
        </View>) }
        <style global jsx>{`
            .ProductsList {}
            .block {
                display: block
            }
            @media screen and (min-width: 961px) {
                .clear4 {
                    content: '';
                    clear: both;
                    display: table;
                }
            }
            @media screen and (min-width: 781px) and (max-width: 960px) {
                .clear3 {
                    content: '';
                    clear: both;
                    display: table;
                }
            }
            @media screen and (max-width: 780px) {
                .clear2 {
                    content: '';
                    clear: both;
                    display: table;
                }
            }
        `}</style>
    </div>
)

export default ProductsList