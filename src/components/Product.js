import css from '../../styles/vars'

const Product = ({item,_key: key}) => (
    <div className={`Product ${key%3!=0?'shift':''}`}>
        <div className="img"></div>
        <div className="clearfix">
            <h4 className="title slim">{item.name}</h4>
        </div>
        <style jsx>{`
            .Product {
                width: calc(calc(100% / 3) - 1%);
                float: left;
            }
            @media screen and (min-width: 961px) {
                .Product.shift {
                    margin-left: 1.5%;
                }
            }
            .img {
                height: 240px;
                background: url(${item.images.length? item.images[0].src:''}) no-repeat center;
                background-size: cover;
                background-color: ${css.colors.wisteriasnow};
            }
            .title {
                color: ${css.colors.bluetwilight};
                transition: .25s ease-out;
            }
            @media screen and (max-width: 960px) {
                .Product {
                    width: calc(calc(100% / 2) - 0.75%);
                }
                .Product:nth-child(even) {
                    margin-left: 1.5%;
                }
            }
            .Product:hover .title {
                color: ${css.colors.fallleaf};
            }
        `}</style>
    </div>
)

export default Product