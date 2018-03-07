import React from 'react'
import Layout from '../src/layouts/_default'
import css from '../styles/vars'
import { ProductsContainer, ShoppingCart } from '../src/containers'
import constants, {API_CALLS, bindToThis, sleep} from '../src/constants'
import toastr from 'toastr'

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            per_page: 22,
            products: [],
            productsOnDisplay: [],
            page: 1,
            displayOnFetch: false,
            noMoreProductsFromServer: false,
            loading: true,
            loadingFailed: false,
        }

        // bind
        bindToThis(this, 'showProducts')
        bindToThis(this, 'actionHandler')
    }
    componentWillMount() {
        this.showProducts();
    }
    actionHandler(type, data) {
        switch (type) {
            case 'toast.show':
                let payload = {...data}
                payload.title = payload.title || ""
                data.type == 's'?
                    toastr.success(payload.msg, payload.title):
                    (
                        data.type == 'i'?
                        toastr.info(payload.msg, payload.title):
                            (
                                data.type == 'w'?
                                    toastr.warning(payload.msg, payload.title):
                                    toastr.error(payload.msg, payload.title)
                            )
                    )
                break;
        }
    }
    async fetchProducts() {
        let {per_page, page, products, productsOnDisplay} = this.state 
        this.setState({ loading: !products.length, loadingFailed: false })
        await sleep(500) // sleep for a half second
        let f = (await API_CALLS.fetchProducts(per_page, page)).data

        if (!!f) {
            // only pick properties we need
            f = f.filter(p =>
                p.in_stock && (({id, name, price, images, description, short_description: about}) => ({id, name, price, images, description, about}))(p)
            )
            products = products.concat(f)
        } else if (!this.state.productsOnDisplay.length) this.setState({ loadingFailed: true })

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
        const productContainerProps = {
            items: this.state.productsOnDisplay, // products to display
            _showMore: this.showProducts, // handler for show more button
            canShowMore: !(this.state.noMoreProductsFromServer && !this.state.products.length), // informs show more button if we're out of more items
            loading: this.state.loading, // show loader or not
            notfound: this.state.loadingFailed, // did we fail to load products from server?
        }

        return <Layout>
            <h1 className="title font-sourcesans">Smoothie Express</h1>
            <div className="text-center">
                <h4 className="slogan">find the perfect blend</h4>
            </div>
            
            <ProductsContainer {...productContainerProps} actionHandler={this.actionHandler}></ProductsContainer>

            <ShoppingCart actionHandler={this.actionHandler} />
            
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