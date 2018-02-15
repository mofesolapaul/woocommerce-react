import css from '../../styles/vars'
import { Loading, Product, View } from '.'

// clearfixes for proper layout
const Clear = p => <span className={`product-row-divider clear${p.k}`}></span>

// show more
const ShowMore = ({clickHandler, finished}) => <div className="show-more-pane">
    <a onClick={finished? null:clickHandler} className={`btn show-more-btn ${finished? 'dead':''}`}>
        {!finished? 'Show more':"Yup, that's all!"}
    </a>
</div>

const ProductsList = ({items, _showMore, canShowMore, loading}) => (
    <div className="ProductsList clearfix">
        <Loading visible={loading} />

        <View>
            { items.map((product, index) => <View key={index}>
                <Product _key={index} item={product} />
                {(index+1)%2 || items.length-1 == index? null:<Clear k={2} />}
                {(index+1)%3 || items.length-1 == index? null:<Clear k={3} />}
                {(index+1)%4 || items.length-1 == index? null:<Clear k={4} />}
            </View>) }
            <div className="clearfix"></div>
        </View>

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
            .show-more-btn {
                padding: 1rem;
                text-transform: uppercase;
                border-radius: 100px;
                background: ${css.colors.ultrawhite};
                border: none;
                filter: drop-shadow(0px 4px 6px rgba(82,89,101,.25));
            }
            .show-more-btn:hover, .show-more-btn.dead {
                background: ${css.colors.rogueblue};
                color: ${css.colors.ultrawhite};
                filter: none;
            }
        `}</style>
    </div>
)

export default ProductsList