import flux from 'flux-react'
import actions from '../actions'

export default flux.createStore({
    orders: {},
    actions: [...actions],
    addToCart: function(item) {},
    removeFromCart: function(item) {},
})