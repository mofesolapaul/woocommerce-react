import React from 'react'
import Layout from '../layouts/_default'
import Api from '../WooCommerce/Api'

const fetchData = async() => {
    let res = await Api.get('products', {
        per_page: 2,
        page: 1
    })
    let data = await res.json()
    return { data }
}

export default class Index extends React.Component {
    static async getInitialProps({ req }) {
        return fetchData()
    }
    render() {
        return <Layout>
            <p>WooCommerce React.</p>
        </Layout>
    }
}