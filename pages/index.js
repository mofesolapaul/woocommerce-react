import React from 'react'
import Layout from '../src/layouts/_default'
import Wc from '../src/WooCommerce/Wc'
import css from '../styles/vars'
import {ProductsContainer} from '../src/containers'
import {ProductsList} from '../src/components'
import constants from '../src/constants'

const fetchData = async(count = 2) => {
    return await Wc.get('products', { per_page: count, page: 1 })
}

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            limit: 6,
            fetched: [],
        }
    }
    componentWillMount() {
        this.refresh();
    }
    async refresh() {
        let {limit} = this.state
        const f = (await fetchData(limit)).data
        this.setState({ limit, fetched: f||constants.products })
    }
    render() {
        return <Layout>
            <h1 className="title">Smoothie Express</h1>
            <div className="text-center">
                <h4 className="slogan">find the perfect blend</h4>
            </div>
            
            <ProductsContainer>
                <ProductsList items={this.state.fetched}>
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