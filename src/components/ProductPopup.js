import css from '../../styles/vars';
import { srcList } from '../constants';
import { ProductImage, View } from './';

export default ({product, visible, actionHandler}) => !!visible && <View>
  <div className="product-popup curtain" id="pp--" onClick={e => e.target.id == 'pp--' && actionHandler('product-popup.dismiss')}>
    <div className="product-modal modal">
      <div className="pp--img-wheel">
        <ProductImage src={srcList(product.images)}  />
      </div>
      <div className="pp--body">
        <h3 className="pp--title slim">{product.name}</h3>
        <p className="pp--desc" dangerouslySetInnerHTML={{ __html: product.description }}></p>
        
        {product.categories.map((c, i) => <span key={i} className="pp--label">{c.name}</span>)}

        <p className="pp--desc" dangerouslySetInnerHTML={{ __html: product.about }}></p>
        <div className="text-center">
          <a onClick={e => actionHandler('product-popup.dismiss')} className={`btn sleek-btn`}>Dismiss</a>
        </div>
      </div>
    </div>
  </div>

  {/* styling */}
  <style jsx>{`
    .product-modal {
      background: ${css.colors.background};
      max-width: 480px;
      padding: 0;
    }
    .pp--img-wheel {
      height: 33vh;
      min-height: 240px;
      flex: 1;
      background: ${css.colors.wisteriasnow};
      flex-direction: column;
      overflow: hidden;
      position: relative;
    }
    .pp--title {
      color: ${css.colors.foreground};
      transition: .25s ease-out;
      margin-bottom: 0;
      font-size: 150%;
      flex-grow: 1;
      margin: 0;
    }
    .pp--desc {
        color: ${css.colors.bluetwilight};
    }
    .pp--body {
      padding: 1rem;
      max-height: 60vh;
      overflow-y: auto;
    }
    .pp--label {
      background: ${css.colors.primarydark};
      color: ${css.colors.background};
      text-transform: uppercase;
      font-size: smaller;
      padding: 2px 5px;
      border-radius: 2px;
      margin-right: 2px;
    }
  `}</style>
</View>