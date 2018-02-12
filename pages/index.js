import React from 'react'
import Layout from '../layouts/_default'
import Wc from '../WooCommerce/Wc'

const fetchData = async(count = 2) => {
    return await Wc.get('products', { per_page: count, page: 1 })
}

export default class Index extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            limit: 2,
            fetched: false,
        }
    }
    static async getInitialProps({ req }) {
        // return {}
        return fetchData()
    }
    async refresh(e) {
        let {value: limit} = e.target
        if (!limit || isNaN(limit) || limit == this.state.limit) return;
        const f = (await fetchData(limit)).data
        this.setState({ limit, fetched: f })
    }
    render() {
        const data = this.state.fetched||this.props.data
        const items = data? data.map(p => <li key={p.id}>{p.name}</li>):[]
        return <Layout>
            <p>WooCommerce React.</p>
            <input type="text" onChange={this.refresh.bind(this)} />
            <ul>
                {items}
            </ul>
        </Layout>
    }
}