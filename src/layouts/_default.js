import Head from 'next/head'

const Layout = ({title = 'SmoothieExpress - Check out our new shop', children}) => (
    <div className="layout">
        <Head>
            <title>{ title }</title>
            <meta charSet='utf-8' />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href="/static/css/style.css" />
            <link async href="/static/css/toastr.min.css" rel="stylesheet" />
            <link async href="https://fonts.googleapis.com/css?family=Playfair+Display|Source+Sans+Pro:100,400,900" rel="stylesheet" />
            <link rel="icon" type="image/png" href="/static/img/smoothie-express.ico" />
        </Head>
        { children }
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