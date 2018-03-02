import flux from 'flux-react'
import actions from '../actions'
import {isEmpty, ORDER_COMPLETE} from '../constants'

export default flux.createStore({
    orders: {},
    customer: {},
    actions: [
        actions.addToCart,
        actions.removeFromCart,
        actions.deleteOrder,
        actions.updateQty,
        actions.checkout,
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
    checkout: function(cust_data, isPaid = false) {
        console.log(cust_data)
        this.customer = { ...this.customer, ...cust_data }
        if (isPaid) {
            let [first_name, last_name] = cust_data['checkout.clientname'].split(' ', 2)
            let payload = {
                payment_method_title: 'Paystack Online Payment',
                set_paid: false,
                billing: {
                    first_name,
                    last_name,
                }
            }
            console.log(payload)
            this.emit('checkout.payment')
        }
        else this.emit('order.complete', ORDER_COMPLETE)
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