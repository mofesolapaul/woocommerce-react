import flux from 'flux-react'
import actions from '../actions'
import {isEmpty} from '../constants'

export default flux.createStore({
    orders: {},
    actions: [
        actions.addToCart,
        actions.removeFromCart,
        actions.deleteOrder,
        actions.updateQty,
    ],
    addToCart: function(item) {
        if (!!this.orders[item.id]) this.orders[item.id].qty++
        else this.orders[item.id] = { product: item, qty: 1 }
        this.emit('order.add', item.id)
    },
    removeFromCart: function(item) {
        if (!!this.orders[item.id]) {
            if (this.orders[item.id].qty == 1) delete this.orders[item.id]
            else this.orders[item.id].qty-- 
            this.emit('order.remove', item.id)
        }
    },
    deleteOrder: function(id) {
        delete this.orders[id]
        this.emit('order.delete', id) // products depend on this is to update their state
    },
    updateQty: function(id, qty) {
        if (this.orders[id]) {
            this.orders[id].qty = qty
            this.emit('order.qty', id)
        }
    },
    persist: function() {

    },
    exports: {
        getQty: function(id) {
            return !!this.orders[id]? this.orders[id].qty:0
        },
        isEmpty: function() {
            return isEmpty(this.orders)
        },
        getTotal: function() {
            let total = 0
            isEmpty(this.orders)? 0:Object.keys(this.orders).map((o) => {
                total += (this.orders[o].qty * this.orders[o].product.price)
            })
            return total;
        },
        getAllOrders: function() {
            return Object.values(this.orders)
        }
    }
})