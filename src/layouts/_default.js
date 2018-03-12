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
            
            <link rel="icon" href="/static/favicon/smallsmoothie3-1.png" type="image/png"/>
            <link rel="icon" href="/static/favicon/cropped-smoothie_small_transparent_bg-32x32.png" sizes="32x32" />
            <link rel="icon" href="/static/favicon/cropped-smoothie_small_transparent_bg-192x192.png" sizes="192x192" />
            <link rel="apple-touch-icon-precomposed" href="/static/favicon/cropped-smoothie_small_transparent_bg-180x180.png" />
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