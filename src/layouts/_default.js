import Head from 'next/head';
import {URL} from '../Config';

const Layout = ({title = 'SmoothieExpress - Check out our new shop', children}) => (
    <div className="layout">
        <Head>
            <title>{ title }</title>
            <meta charSet='utf-8' />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            <link rel="stylesheet" href={`${URL.base}static/css/style.css`} />
            <link async href={`${URL.base}static/css/toastr.min.css`} rel="stylesheet" />
            <link async href="https://fonts.googleapis.com/css?family=Playfair+Display|Source+Sans+Pro:100,400,900" rel="stylesheet" />
            
            <link rel="icon" href={`${URL.base}static/favicon/smallsmoothie3-1.png`} type="image/png"/>
            <link rel="icon" href={`${URL.base}static/favicon/cropped-smoothie_small_transparent_bg-32x32.png`} sizes="32x32" />
            <link rel="icon" href={`${URL.base}static/favicon/cropped-smoothie_small_transparent_bg-192x192.png`} sizes="192x192" />
            <link rel="apple-touch-icon-precomposed" href={`${URL.base}static/favicon/cropped-smoothie_small_transparent_bg-180x180.png`} />

            <script key="gmaps" async type="text/javascript" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBPRVkaNQhmcgwt1DpKOYuP16wbdw7c_CE&libraries=places"></script>
        </Head>
        { children }
    <style jsx>{`
    .layout {
        padding: 2%;
        background: #ebe473;
        height: 100%;
        // display: flex;
    }
    `}</style>
    </div>
);

export default Layout