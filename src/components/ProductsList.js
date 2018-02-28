import css from '../../styles/vars'
import { Loading, NotFound, Product, View } from '.'


const ProductsList = ({items, _showMore, canShowMore, loading, notfound}) => (
    <div className="ProductsList clearfix">
        <View>
            { items.map((product, index) => <View key={index}>
                <Product _key={index} item={product} />
                {(index+1)%2 || items.length-1 == index? null:<Clear k={2} />}
                {(index+1)%3 || items.length-1 == index? null:<Clear k={3} />}
                {(index+1)%4 || items.length-1 == index? null:<Clear k={4} />}
            </View>) }
            <div className="clearfix"></div>
        </View>

        {/* ux */}
        <Loading visible={loading} />
        <NotFound visible={notfound} retryHandler={_showMore} />

        {/* show more button */}
        { !!items.length? <ShowMore clickHandler={_showMore} finished={!canShowMore} />:null }

        {/* style */}
        <style global jsx>{`
            .ProductsList {
                position: relative;
            }
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
            // @media screen and (min-width: 961px) {
            //     .clear4 {
            //         clear: both;
            //         display: block;
            //     }
            // }
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

            .show-more-pane {
                margin-top: 2rem;
                text-align: center;
            }
        `}</style>
    </div>
)

export default ProductsList