import Head from 'next/head'

const Layout = props => (
    <div className="layout">
        <Head>
            <title>SmoothieExpress - Check out our new shop</title>
            <link rel="stylesheet" href="/static/css/style.css" />
            <link async href="https://fonts.googleapis.com/css?family=Playfair+Display|Source+Sans+Pro:400,900" rel="stylesheet" />
        </Head>
        { props.children }
    <style jsx>{`
    .layout {
        padding: 2%;
        background: peach;
        height: 100%;
        // display: flex;
    }
    `}</style>
    </div>
)

export default Layout