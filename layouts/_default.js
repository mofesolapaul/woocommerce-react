import Head from 'next/head'

const Layout = props => (
    <div className="layout">
        <Head>
            <title>SmoothieExpress - Check out our new shop</title>
            <link rel="stylesheet" href="/static/css/style.css" />
        </Head>
        { props.children }
    <style jsx>{`
    .layout {
        padding: 2%;
    }
    `}</style>
    </div>
)

export default Layout