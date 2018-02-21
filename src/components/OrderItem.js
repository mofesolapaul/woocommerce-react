import css from '../../styles/vars'
import {moneyFormat} from '../constants'

export default ({item, clickHandler}) => <div className="OrderItem flex">
    <div className="img" />
    <div className="info">
        <h3 className="title">{item.product.name}</h3>
        <p className="text">{`\u20A6`}{moneyFormat(item.product.price)} per unit</p>
    </div>

    {/* styles */}
    <style jsx>{`
        .OrderItem {
            color: ${css.colors.rogueblue};
            margin-bottom: .5rem;
        }
        .img {
            width: 48px;
            height: 48px;
            background: url(${item.product.images.length? item.product.images[0].src:''}) center no-repeat;
            background-size: cover;
            background-color: ${css.colors.wisteriasnow};
        }
        .info {
            padding-left: .5rem;
            flex-grow: 1;
        }
        .title {
            margin: 0
        }
        .text {
            margin-top: 2px;
        }
    `}</style>
</div>