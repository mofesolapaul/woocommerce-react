import React from 'react'
import Layout from '../layouts/_default'
import Wc from '../WooCommerce/Wc'
import Css from '../styles/vars'

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
            <h1 className="title">Smoothie Express</h1>
            <h4 className="slogan">find the perfect blend</h4>
            <style jsx>{`
                .title {
                    text-transform: uppercase;
                    color: ${Css.colors.fallleaf};
                    text-shadow: ${Css.colors.bluetwilight} 2px 2px;
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
                }
            `}</style>
        </Layout>
    }
}