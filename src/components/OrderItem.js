import css from '../../styles/vars'
import {moneyFormat} from '../constants'

export default ({item, clickHandler}) => <div className="OrderItem">
    <div className="img" />
    <div className="info">
        <h4>{item.product.name}</h4>
        <p>{`\u20A6`}{moneyFormat(item.product.price)} per unit</p>
    </div>

    {/* styles */}
    <style jsx>{`
        .OrderItem {}
        .img {
            width: 48px;
            height: 48px;
            background: url(${item.product.images.length? item.product.images[0].src:''}) center no-repeat;
            background-size: cover;
            background-color: ${css.colors.wisteriasnow};
        }
    `}</style>
</div>