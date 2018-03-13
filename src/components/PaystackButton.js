import React from 'react'
import PaystackButton from 'react-paystack'
import Head from 'next/head'
import { View } from '.'
import {URL} from '../Config'

export default class _default extends React.Component {
    constructor(props) {
        super(props)
    }
    pay() {
        this.innerBtn.payWithPaystack()
    }
    render() {
        return <View>
            <Head key="paystack-script">
                <script async src={`${URL.base}static/js/paystack.inline.min.js`}></script>
            </Head>
            <PaystackButton {...this.props} ref={btn => this.innerBtn = btn} />
        </View>
    }
}