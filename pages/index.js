import React from 'react'
import Layout from '../layouts/_default'
import Api from '../WooCommerce/Api'

const fetchData = async(count = 2) => {
    let res = await Api.get('products', {
        per_page: count,
        page: 1
    })
    if (!res) return {}
    let data = await res.json()
    
    if (data.fallback) {
        data = await new Promise((resolve) => {
            var xhttp = new XMLHttpRequest()
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                   resolve(JSON.parse(this.responseText))
                }
            };
            xhttp.open(data.fallback.method, data.fallback.url, true)
            xhttp.send()
        })
    }

    return { data }
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