import React from 'react'
import toastr from 'toastr'
import Layout from '../src/layouts/_default'
import css from '../styles/vars'
import { LoadingScreen, ProductsContainer, ShoppingCart } from '../src/containers'
import constants, {API_CALLS, APP_SHOW_TOAST, bindToThis, sleep} from '../src/constants'
import {Cart} from '../src/stores'

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
            productsLoading: true,
            productsLoadingFailed: false,
            busy: false,
            orderCreated: false,
            pendingOrderIsPaid: false,
            productFetchInProgress: false,
        }

        // bind
        bindToThis(this, 'actionHandler')
        bindToThis(this, 'reload')
        bindToThis(this, 'showProducts')
        bindToThis(this, 'updateState')
    }

    componentWillMount() {
        Cart.on('app.*', this.updateState)
        Cart.on('cart.reset', this.reload)
        this.showProducts();
    }

    componentWillUnmount() {
        Cart.off('app.*', this.updateState)
        Cart.off('cart.reset', this.reload)
    }

    reload() {
        setTimeout(() => location.reload(), 3000)
    }

    updateState(d) {
        this.setState({
            orderCreated: Cart.isOrderCreated(),
            pendingOrderIsPaid: Cart.pendingOrderIsPaid(),
        })

        if (!!d && !!d.id) {
            switch (d.id) {
                case APP_SHOW_TOAST:
                    this.actionHandler('toast.show', d)
                    break;
            }
        }
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
            case 'app.busy':
                this.setState({ busy: data===false? false:true })
                break;
        }
    }

    async fetchProducts() {
        let {per_page, page, products, productsOnDisplay, productFetchInProgress} = this.state 
        
        // prevent the case where the same products are loaded multiply
        // when the user clicks 'Show more' too rapidly
        if (productFetchInProgress) return;
        this.setState({productFetchInProgress: true});

        this.setState({ productsLoading: !products.length, productsLoadingFailed: false })
        await sleep(500) // sleep for a half second
        let f = (await API_CALLS.fetchProducts(per_page, page)).data

        if (!!f) {
            console.log(f.length)
            // only pick properties we need
            let c = []
            f.filter(p => {
                // if (p.in_stock)
                    c.push( (({id, name, price, images, description, short_description: about}) => ({id, name, price, images, description, about}))(p) )
            })
            products = products.concat(c)
        } else if (!this.state.productsOnDisplay.length) this.setState({ productsLoadingFailed: true })

        this.setState({
            per_page,
            products,
            page: !!f?page+1:page,
            noMoreProductsFromServer: !!f&&!f.length,
            productsLoading: false,
            productFetchInProgress: false,
        })
        if (this.state.displayOnFetch) this.showProducts(true)
    }

    showProducts(nofetch) {
        let {products, productsOnDisplay} = this.state
        if (products.length) {
            productsOnDisplay = productsOnDisplay.concat( products.splice(0, 6) )
            this.setState({products, productsOnDisplay, displayOnFetch: false})
        } else this.setState({displayOnFetch: true})
        
        // sync storage
        Cart.load()

        // load more from server
        if (nofetch === true) return
        if (!this.state.noMoreProductsFromServer) new Promise(() => this.fetchProducts())
    }
    
    render() {
        const productContainerProps = {
            items: this.state.productsOnDisplay, // products to display
            _showMore: this.showProducts, // handler for show more button
            canShowMore: !(this.state.noMoreProductsFromServer && !this.state.products.length), // informs show more button if we're out of more items
            loading: this.state.productsLoading, // show loader or not
            notfound: this.state.productsLoadingFailed, // did we fail to load products from server?
            readonly: this.state.orderCreated, // order already created, ac accordingly
            actionHandler: this.actionHandler, // action handler
            pendingOrderIsPaid: this.state.pendingOrderIsPaid, // is the pending order paid for already?
        }

        return <Layout>
            <h1 className="title font-sourcesans">Smoothie Express</h1>
            <div className="text-center">
                <h4 className="slogan">find the perfect blend</h4>
            </div>
            
            <ProductsContainer {...productContainerProps}></ProductsContainer>

            <ShoppingCart actionHandler={this.actionHandler} readonly={this.state.orderCreated} skipPayment={this.state.pendingOrderIsPaid} />

            <LoadingScreen show={this.state.busy} />
            
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