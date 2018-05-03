import Wc from './WooCommerce/Wc'

export default {
    products: [
        {id: 1, name: 'Product #1', images: [], price: 100},
        {id: 2, name: 'Product #2', images: [], price: 800},
        {id: 3, name: 'Product #4', images: [], price: 300},
        {id: 4, name: 'Product #5', images: [], price: 450},
        {id: 5, name: 'Product #3', images: [], price: 703.56},
        {id: 6, name: 'Product #6', images: [], price: 800},
        {id: 7, name: 'Product #7', images: [], price: 200},
        {id: 8, name: 'Product #8', images: [], price: 400},
    ],
    shipping_methods: [],
    sample_order: {
        payment_method: 'bacs',
        payment_method_title: 'Direct Bank Transfer',
        set_paid: true,
        billing: {
          first_name: 'John',
          last_name: 'Doe',
          address_1: '969 Market',
          address_2: '',
          city: 'San Francisco',
          state: 'CA',
          postcode: '94103',
          country: 'US',
          email: 'john.doe@example.com',
          phone: '(555) 555-5555'
        },
        shipping: {
          first_name: 'John',
          last_name: 'Doe',
          address_1: '969 Market',
          address_2: '',
          city: 'San Francisco',
          state: 'CA',
          postcode: '94103',
          country: 'US'
        },
        shipping_lines: [
          {
            method_id: 'flat_rate',
            method_title: 'Flat Rate',
            total: 10
          }
        ]
      }
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const kformat = num => (
    num > 999999? (num/1000).toFixed(1) + 'M' : (
        num > 999? (num/1000).toFixed(1) + 'k' : num
    )
)

export const isEmpty = o => {
    switch (typeof o) {
        case 'object':
            return Object.keys(o).length == 0
            break;
    }
}

export const moneyFormat = amt => amt.toLocaleString('en-US')

/**
 * Helper for binding `this` context to methods
 * @param {object} dis The `this` we're binding to
 * @param {string} prop The methodname to bind
 */
export const bindToThis = (dis, prop) => dis[prop] = dis[prop].bind(dis)

export const poip_valid = (poip) => !!poip && typeof poip === 'object' && poip.hasOwnProperty('reference') && poip.hasOwnProperty('trxref')

// works best for cases like 1,200.00, 800.00, 200
export const pullInt = str => +str.match(/\.?\d+/g).join('');

/**
 * Generates a random `uid`
 */
export const uid = () =>
    btoa(
        Date.now() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    ).replace('=','')

export const ORDER_API_SUCCESS = 'order.api.success'
export const ORDER_API_ERROR = 'order.api.error'

export const ORDER_ITEM_UPDATE = 'order.item.update'
export const ORDER_SHIPPING_COST = 'order.shipping.cost'

export const APP_SHOW_TOAST = 'app.show.toast'

export const API_CALLS = {
    async fetchProducts(per_page, page) {
        return await Wc.get('products', !!per_page && { per_page, page })
    },
    async createOrder(options) {
        return await Wc.post('orders', options)
    },
    async getShippingMethods() {
        return await Wc.get('shipping_methods')
    },
    async markOrderAsPaid(order_id, data) {
        return await Wc.put(`orders/${order_id}`, data)
    },
}

export const db = {
    put: (key, data) => {
        new Promise((resolve, reject) => {
            localStorage.setItem(key, btoa(unescape(encodeURIComponent(JSON.stringify(data)))))
            resolve()
        }).then(d => null).catch(e => null)
    },
    get: (key) => {
        return new Promise((resolve, reject) => {
            const data = localStorage.getItem(key)
            if (!data) resolve(data)
            else {
                try {
                    const value = JSON.parse(decodeURIComponent(escape(window.atob(data))))
                    resolve(value)
                } catch (e) {
                    resolve(null)
                }
            }
        })
    },
    clear: () => localStorage.clear()
}

/**
 * Fetch Products from the API
 */
export const apiFetchProducts = async (per_page, page) => {
    let f = (await API_CALLS.fetchProducts(per_page, page)).data
    if (!!f) {
        // only pick properties we need
        let c = []
        f.filter(p => {
            // if (p.in_stock)
                c.push( (({id, name, price, images, description, categories, short_description: about}) => ({id, name, price, images, description, categories, about}))(p) )
        })
        return c
    } else false
}

export const productCache = {
    load: async function() {
        if (this.signature() != await db.get(CACHE.DB_KEY_CACHE_SIGNATURE)) {
            // invalidate cache
            // set the wheels rolling and update signature
            return []
        } else return await db.get(CACHE.DB_KEY_PRODUCTS)
    },
    push: async function(data) {
    },
    clear: function() {
        db.put(CACHE.DB_KEY_PRODUCTS, [])
    },
    /**
     * this is how we determine whether to invalidate cache
     */
    signature: function() {
        const dateObject = new Date()
        const month = dateObject.getMonth()
        const weekOfMonth = Math.ceil(dateObject.getDate() / 7)
        return weekOfMonth
    },
    test: async function() {
        console.log('signature', this.signature())
    },
}

export const CART = {
    DB_KEY_ORDERS: `____${0x1234567}`,
    DB_KEY_NEW_ORDER_ID: `____${0x1234568}`,
    DB_KEY_CUSTOMER_DATA: `____${0x1234569}`,
    DB_KEY_PAYMENT_DATA: `____${0x1234570}`,
}

export const CACHE = {
    DB_KEY_PRODUCTS: `____${0x1234571}`,
    DB_KEY_CACHE_SIGNATURE: `____${0x1234572}`,
}