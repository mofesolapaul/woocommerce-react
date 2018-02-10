import React from 'react'
import Layout from '../layouts/_default'
import Api from '../WooCommerce/Api'

const fetchData = async() => {
    let data = await Api.get('products', {
        per_page: 2,
        page: 1
    })
    console.log(data)
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