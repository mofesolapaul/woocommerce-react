import PaystackButton from 'react-paystack'
import Head from 'next/head'
import { View } from '.'

export default (props) => 
    <View>
        <Head key="paystack-script">
            <script async src="/static/js/paystack.inline.min.js"></script>
        </Head>
        <PaystackButton {...props} />
    </View>