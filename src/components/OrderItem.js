import css from '../../styles/vars';
import {moneyFormat, hasExtras, extrasList, getExtrasTotal} from '../constants';

export default ({item, actionHandler}) => <div className="OrderItem flex">
    <div className="img" />
    <div className="info">
        <h3 className="title font-primary">{item.product.name}</h3>
        {!!item.product.extras ? <span>: {extrasList(item.product.extras.extras, item.product.extras.dressing)}</span>:''}
        <p className="text font-secondary">
            {`\u20A6`}{moneyFormat(item.product.price)} 
            &nbsp;{!!item.product.extras? `+ \u20A6`+getExtrasTotal(item.product.extras.extras):''}
            &nbsp;per unit</p>
        <a className="btn"
            onClick={e => actionHandler('order.delete', {id: item.product.__id || item.product.id})}>Remove from cart</a>
        &nbsp;{hasExtras(item.product) &&
                <a className="btn green"
                    onClick={e => actionHandler('extras.show', {
                        category: hasExtras(item.product),
                        product: item.product
                    })}>Manage Extras</a>}
    </div>
    <div className="action">
        <div><strong>Qty:</strong></div>
        <input className="qty font-secondary" type="number" min="1" value={item.qty}
            onChange={e => actionHandler('order.qty.change', {id: item.product.__id || item.product.id, el: e.target})} />
    </div>

    {/* styles */}
    <style jsx>{`
        .OrderItem {
            color: ${css.colors.foreground};
            margin-bottom: 1rem;
            position: relative;
        }
        .OrderItem + .OrderItem > .info::before {
            position: absolute;
            width: 100%;
            height: 1px;
            background: ${css.colors.orchidash};
            top: -.5rem;
            content: '';
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
            margin: 2px 0;
        }
        .qty {
            border: solid thin ${css.colors.wisteriasnow};
            background: none !important;
            font-size: larger;
            padding: 4px;
            max-width: 64px;
            margin-top: 4px;
        }
        .btn {
            padding: 2px 4px;
            background: ${css.colors.desertbone};
            color: ${css.colors.foreground};
            font-size: x-small;
            border: none;
            font-weight: lighter;
            letter-spacing: .5px;
        }
        .btn.green {
            background: rgba(0, 128, 128, .3);
            color: ${css.colors.touchof};
        }
    `}</style>
</div>