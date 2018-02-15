import flux from 'flux-react'
import actions from '../actions'

export default flux.createStore({
    orders: {},
    actions: [
        actions.addToCart,
        actions.removeFromCart,
    ],
    addToCart: function(item) {
        console.log('Add to cart')
    },
    removeFromCart: function(item) {
        console.log('Remove from cart')
    },
})