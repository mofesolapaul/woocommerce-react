import React from 'react'
import Layout from '../src/layouts/_default'
import Wc from '../src/WooCommerce/Wc'
import css from '../styles/vars'
import {ProductsContainer} from '../src/containers'
import { ProductsList } from '../src/components'
import constants from '../src/constants'

const _products = async(per_page, page) => {
    return await Wc.get('products', { per_page, page })
}

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            per_page: 12,
            products: [],
            productsOnDisplay: [],
            page: 1,
            displayOnFetch: false,
            noMoreProductsFromServer: false,
            loading: true,
        }
    }
    componentDidMount() {
        this.showProducts();
    }
    async fetchProducts() {
        this.setState({ loading: true })
        await new Promise(resolve => setTimeout(resolve, 30000)) // sleep
        let {per_page, page, products} = this.state 
        let f = (await _products(per_page, page)).data

        // only pick properties we need
        if (!!f) {
            f = f.map(p =>
                (({name, price, images, description, short_description: about}) => ({name, price, images, description, about}))(p)
            )
            products = products.concat(f)
        }

        this.setState({
            per_page,
            products,
            page: !!f?page+1:page,
            noMoreProductsFromServer: !!f&&!f.length,
            loading: false
        })
        if (this.state.displayOnFetch) this.showProducts(true)
    }
    showProducts(nofetch) {
        let {products, productsOnDisplay} = this.state
        if (products.length) {
            productsOnDisplay = productsOnDisplay.concat( products.splice(0, 6) )
            this.setState({products, productsOnDisplay, displayOnFetch: false})
        } else this.setState({displayOnFetch: true})
        
        // load more from server
        if (nofetch === true) return
        if (!this.state.noMoreProductsFromServer) new Promise(() => this.fetchProducts());
    }
    render() {
        const productListProps = {
            items: this.state.productsOnDisplay, // products to display
            _showMore: this.showProducts.bind(this), // handler for show more button
            canShowMore: !(this.state.noMoreProductsFromServer && !this.state.products.length), // informs show more button if we're out of more items
            loading: this.state.loading, // show loader or not
        }

        return <Layout>
            <h1 className="title font-sourcesans">Smoothie Express</h1>
            <div className="text-center">
                <h4 className="slogan">find the perfect blend</h4>
            </div>
            
            <ProductsContainer>
                <ProductsList {...productListProps} />
            </ProductsContainer>
            
            {/* style */}
            <style jsx>{`
                .title {
                    text-transform: uppercase;
                    color: ${css.colors.fallleaf};
                    // text-shadow: ${css.colors.bluetwilight} 2px 2px;
                    letter-spacing: 1px;
                    word-spacing: 2px;
                    transition: .5s ease-out;
                    text-align: center;
                    margin-bottom: 0;
                }
                .title:hover {
                    text-shadow: none;
                }
                .slogan {
                    text-align: center;
                    margin-top: .5rem;
                    display: inline-block;
                    color: ${css.colors.rogueblue};
                    position: relative;
                }
                .slogan::before, .slogan::after {
                    content: '';
                    position: absolute;
                    height: 1px;
                    width: 50%;
                    top: 0;
                    bottom: 0;
                    margin: auto;
                    background: rgba(82,89,101, .5);
                }
                .slogan::before {
                    left: -60%;
                }
                .slogan::after {
                    right: -60%;
                }
            `}</style>
        </Layout>
    }
}