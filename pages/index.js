import React from 'react'
import Layout from '../src/layouts/_default'
import Wc from '../src/WooCommerce/Wc'
import css from '../styles/vars'
import {ProductsContainer} from '../src/containers'
import {ProductsList} from '../src/components'
import constants from '../src/constants'

const _products = async(per_page, page) => {
    return await Wc.get('products', { per_page, page })
}

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            per_page: 8,
            products: [],
            page: 1,
        }
    }
    componentDidMount() {
        this.fetchProducts();
    }
    async fetchProducts() {
        let {per_page, page} = this.state
        const f = (await _products(per_page, page)).data
        this.setState({ per_page, products: f||constants.products, page: f?page+1:page })
    }
    render() {
        return <Layout>
            <h1 className="title font-sourcesans">Smoothie Express</h1>
            <div className="text-center">
                <h4 className="slogan">find the perfect blend</h4>
            </div>
            
            <ProductsContainer>
                <ProductsList items={this.state.products}>
                </ProductsList>
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