import css from '../../styles/vars';
import { ProductImage, View } from './';

export default ({product, visible, actionHandler}) => !!visible && <View>
  <div className="product-popup curtain">
    <div className="product-modal modal">
      <div className="img-wheel">
        {product.images.map((m, i) => <ProductImage key={i} src={m.src} />)}
      </div>
    </div>
  </div>

  {/* styling */}
  <style jsx>{`
    .product-modal {
      background: ${css.colors.ultrawhite};
      max-width: 480px;
      padding: 0;
    }
    .img-wheel {
      
    }
  `}</style>
</View>