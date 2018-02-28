import React from 'react'
import css from '../../styles/vars'
import actions from '../actions'
import { Loading, NotFound, Product, View } from '../components'

// clearfixes for proper layout
const Clear = p => <span className={`product-row-divider clear${p.k}`}>
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

// show more
const ShowMore = ({clickHandler, finished}) => <div className="show-more-pane">
    <a onClick={finished? null:clickHandler} className={`btn sleek-btn ${finished? 'dead':''}`}>
        {!finished? 'Show more':"Yup, that's all!"}
    </a>
    <style jsx>{`
        .show-more-pane {
            margin-top: 2rem;
            text-align: center;
        }
    `}</style>
</div>

class ProductsContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        let {items, _showMore, canShowMore, loading, notfound} = this.props
        return <div className="wrapper">
            <div className="ProductsContainer">
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
                </div>
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
                .ProductsList {
                    position: relative;
                }
            `}</style>
        </div>
    }
}

export default ProductsContainer