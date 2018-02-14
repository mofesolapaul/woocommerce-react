import css from '../../styles/vars'
import VisibilitySensor from 'react-visibility-sensor'
import { CartButtons, PriceDisplay } from './'

const Product = ({item,_key: key}) => (
    <div className={`Product ${key%4!=0?'shift4':''} ${key%3!=0?'shift3':''}`}>
        <div className="img-wrapper">
            <div className="img"></div>
            <PriceDisplay price={item.price} />
        </div>
        <div className="flex">
            <h4 className="title slim">{item.name}</h4>
            <CartButtons />
        </div>
        <p className="desc" dangerouslySetInnerHTML={{ __html: item.description }}></p>

        {/* style */}
        <style jsx>{`
            .Product {
                float: left;
                width: 100%;
            }
            // @media screen and (min-width: 961px) {
            //     .Product {
            //         width: calc(calc(100% / 4) - .75%);
            //     }
            //     .Product.shift4 {
            //         margin-left: 1%;
            //     }
            // }
            @media screen and (min-width: 781px) {
                .Product {
                    width: calc(calc(100% / 3) - 1%);
                }
                .Product.shift3 {
                    margin-left: 1.5%;
                }
            }
            @media screen and (min-width: 500px) and (max-width: 780px) {
                .Product {
                    width: calc(calc(100% / 2) - 0.75%);
                }
                .Product:nth-of-type(even) {
                    margin-left: 1.5%;
                }
            }
            .img-wrapper {
                position: relative;
                height: 240px;
                overflow: hidden;
            }
            .img {
                height: 100%;
                background: url(${item.images.length? item.images[0].src:''}) no-repeat center;
                background-size: cover;
                background-color: ${css.colors.wisteriasnow};
                position: relative;
                transition: 4s ease-in;
            }
            .img-wrapper::before {
                content: '';
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                height: 100%;
                background: rgba(255,255,255,.5);
                transition: .5s ease-out;
                z-index: 1;
            }
            
            .Product:hover .title {
                color: ${css.colors.fallleaf};
            }
            .Product:hover .img {
                transform: scale(1.2);
            }
            .Product:hover .img-wrapper::before {
                top: 0;
            }
            
            .flex {
                align-items: center;
                padding: 1rem 0;
            }
            .title {
                color: ${css.colors.rogueblue};
                transition: .25s ease-out;
                margin-bottom: 0;
                font-size: 150%;
                flex-grow: 1;
                margin: 0;
            }
            .desc {
                color: ${css.colors.bluetwilight};
            }
        `}</style>
    </div>
)

export default Product