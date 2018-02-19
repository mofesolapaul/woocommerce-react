import flux from 'flux-react'
import actions from '../actions'

export default flux.createStore({
    orders: {},
    actions: [
        actions.addToCart,
        actions.removeFromCart,
    ],
    addToCart: function(item) {
        if (!!this.orders[item.id]) this.orders[item.id].qty++
        else this.orders[item.id] = { product: item, qty: 1 }
        this.emit('order.add')
    },
    removeFromCart: function(item) {
        if (!!this.orders[item.id]) {
            if (this.orders[item.id].qty == 1) delete this.orders[item.id]
            else this.orders[item.id].qty-- 
            this.emit('order.remove')
        }
    },
    persist: function() {

    },
    exports: {
        getQty: function(id) {
            return !!this.orders[id]? this.orders[id].qty:0
        },
        isEmpty: function() {
            return this.orders.length == 0
        }
    }
})