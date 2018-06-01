import Wc from './WooCommerce/Wc';

// literals
export const ORDER_API_SUCCESS = 'order.api.success';
export const ORDER_API_ERROR = 'order.api.error';

export const ORDER_ITEM_UPDATE = 'order.item.update';
export const ORDER_SHIPPING_COST = 'order.shipping.cost';

export const APP_SHOW_TOAST = 'app.show.toast';

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

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export const kformat = num => (
    num > 999999? (num/1000).toFixed(1) + 'M' : (
        num > 999? (num/1000).toFixed(1) + 'k' : num
    )
);

export const isEmpty = o => {
    switch (typeof o) {
        case 'object':
            return Object.keys(o).length == 0;
            break;
    }
};

export const moneyFormat = amt => amt.toLocaleString('en-US');

/**
 * Helper for binding `this` context to methods
 * @param {object} dis The `this` we're binding to
 * @param {string} prop The methodname to bind
 */
export const bindToThis = (dis, prop) => dis[prop] = dis[prop].bind(dis);

export const poip_valid = (poip) => !!poip && typeof poip === 'object' && poip.hasOwnProperty('reference') && poip.hasOwnProperty('trxref');

// works best for cases like 1,200.00, 800.00, 200
export const pullInt = str => +str.match(/\.?\d+/g).join('');

/**
 * Generates a random `uid`
 */
export const uid = () =>
    btoa(
        Date.now() + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    ).replace('=','');

export const API_CALLS = {
    async fetchProducts(per_page, page) {
        return await Wc.get('products', !!per_page && { per_page, page, orderby: 'title', order: 'asc' });
    },
    async createOrder(options) {
        return await Wc.post('orders', options);
    },
    async getShippingMethods() {
        return await Wc.get('shipping_methods');
    },
    async markOrderAsPaid(order_id, data) {
        return await Wc.put(`orders/${order_id}`, data);
    },
    async fetchOrders(data) {
        return await Wc.get(`orders`, data);
    },
};

export const db = {
    put: (key, data) => {
        new Promise((resolve, reject) => {
            localStorage.setItem(key, btoa(unescape(encodeURIComponent(JSON.stringify(data)))));
            resolve();
        }).then(d => null).catch(e => null);
    },
    get: (key) => {
        return new Promise((resolve, reject) => {
            const data = localStorage.getItem(key);
            if (!data) resolve(data);
            else {
                try {
                    const value = JSON.parse(decodeURIComponent(escape(window.atob(data))));
                    resolve(value);
                } catch (e) {
                    resolve(null);
                }
            }
        });
    },
    getSync: (key) => {
        if (typeof localStorage == 'undefined') return;
        const data = localStorage.getItem(key);
        try {
            return JSON.parse(decodeURIComponent(escape(window.atob(data))));
        } catch (e) {
            return null;
        }
    },
    delete: (key) => {
        localStorage.removeItem(key);
    },
    clear: () => localStorage.clear()
};

/**
 * Fetch Products from the API
 */
export const apiFetchProducts = async (per_page, page) => {
    let f = (await API_CALLS.fetchProducts(per_page, page)).data;
    if (!!f && Array.isArray(f)) {
        // only pick properties we need
        let c = [];
        f.filter(p => {
            // if (p.in_stock)
            c.push( (({id, name, price, images, description, categories, short_description: about, total_sales}) => ({id, name, price, images, description, categories, about, total_sales}))(p) );
        });
        return c;
    } else false;
};

/**
 * Products cache
 */
export const productCache = {
    fetch: async function(category) {
        if (this.signature() != await db.get(CACHE.DB_KEY_CACHE_SIGNATURE)) {
            this.load();
            return false;
        } else {
            let products = await db.get(CACHE.DB_KEY_PRODUCTS);
            if (!!category) {
                category = category.toLowerCase();
                db.put(CACHE.DB_KEY_FILTER_CATEGORY, category);
                products = products.filter(p => getCategory(p) == category);
            }
            return products;
        }
    },
    /**
     * Stores provided product data
     */
    push: async function(data, process = false) {
        if (typeof this.__buffer == 'undefined') this.__buffer = [];
        this.__buffer = this.__buffer.concat(data);

        // wait till we're sure we got em all
        if (!process) return;

        // sort products
        // this changes everything, now we can sort by whatever param we want!
        this.__buffer.sort((a,b) => {
            // sort by: in_stock, on_sale, total_sales (desc)
            // ref: https://coderwall.com/p/ebqhca/javascript-sort-by-two-fields
            return a.in_stock - b.in_stock || a.on_sale - b.on_sale || b.total_sales - a.total_sales;
        });
        
        // store it up
        db.put(CACHE.DB_KEY_CACHE_SIGNATURE, this.signature());
        db.put(CACHE.DB_KEY_PRODUCTS, this.__buffer);
    },
    clear: function() {
        db.put(CACHE.DB_KEY_PRODUCTS, []);
    },
    /**
     * Loads products from the server
     */
    load: async function() {
        // in case the double-loading ish enters production, enforce strict measures
        if (!!this.__loading) return;
        this.__loading = true;

        // invalidate cache
        this.clear();

        // set the wheels rolling and update signature
        let per_page = 30;
        let page = 1;
        let data = await apiFetchProducts(per_page, page);
        while (!!data) {
            this.push(data, !data.length);
            if (!!data.length) {
                page++;
                data = await apiFetchProducts(per_page, page);
            } else {
                // exit loop
                data = false;
            }
        }
    },
    /**
     * this is how we determine whether to invalidate cache
     */
    signature: function() {
        const dateObject = new Date();
        const month = dateObject.getMonth();
        const year = dateObject.getFullYear();
        const weekOfMonth = Math.ceil(dateObject.getDate() / 7);
        return btoa(`${weekOfMonth},${month},${year}`);
    },
    test: async function() {
        console.log('CACHEE');
        console.log('fetch', this.fetch());
    },
};

export const CART = {
    DB_KEY_ORDERS: `____${0x1234567}`,
    DB_KEY_NEW_ORDER_ID: `____${0x1234568}`,
    DB_KEY_CUSTOMER_DATA: `____${0x1234569}`,
    DB_KEY_PAYMENT_DATA: `____${0x1234570}`,
    DB_KEY_PERSISTED_CUSTOMER_DATA: `____${0x1234573}`,
};

export const CACHE = {
    DB_KEY_PRODUCTS: `____${0x1234571}`,
    DB_KEY_CACHE_SIGNATURE: `____${0x1234572}`,
    DB_KEY_FILTER_CATEGORY: `____${0x1234574}`,
};

export const EXTRAS = {
    CATEGORIES: ['salads','parfaits','sandwiches'],
    "salads": {
        "cat": "Salads",
        "info": "Select Salad Dressing",
        "extra_info": "Select Salad Extra(s)",
        "dressing": ['English Mayo Dressing', 'Greek Olive Dressing', 'Hawaiian Mustard Dressing'],
        "extras": [
            {"name": "Chicken", "price"  : 500, },
            {"name": "Beef", "price"     : 500, },
            {"name": "Avocado", "price"  : 200, },
            {"name": "Egg", "price"      : 100, },
            {"name": "Cheese", "price"   : 100, },
            {"name": "Raisins", "price"  : 100, },
            {"name": "Onions", "price"   : 0, },
            {"name": "Tomatoes", "price" : 0 },
        ]
    },
    "parfaits": {
        "cat": "Parfaits",
        "extra_info": "Select Parfait Extra(s)",
        "extras": [
            {"name": "Granola", "price"             : 200, },
            {"name": "Raisins", "price"             : 100, },
            {"name": "Dried Coconut Flakes", "price": 100, "long": true },
        ]
    },
    "sandwiches": {
        "cat": "Sandwiches",
        "info": "Select Sandwich Spread",
        "extra_info": "Select Sandwich Extra(s)",
        "dressing": ['Light Mayo Spread', 'Mustard Spread', 'Light Mayo And Mustard Spread'],
        "extras": [
            {"name": "Beef", "price"     : 500, },
            {"name": "Chicken", "price"  : 500, },
            {"name": "Avocado", "price"  : 200, },
            {"name": "Egg", "price"      : 100, },
            {"name": "Cheese", "price"   : 100, },
            {"name": "Olives", "price"   : 100, },
            {"name": "Raisins", "price"  : 100, },
            {"name": "Onions", "price"   : 0, },
            {"name": "Tomatoes", "price" : 0, "long": true },
        ]
    },
};

/**
 * Determine if supplied product has extras
 * @param {object} product 
 */
export const hasExtras = (product) => {
    let cats = [];
    product.categories.map(c => {
        cats.push(c.name.toLowerCase());
    });
    for (let c of cats) {
        if (EXTRAS.CATEGORIES.indexOf(c) !== -1) {
            return c;
        }
    }
    return false;
};

/**
 * Returns extras payload for supplied category
 * @param {string} category 
 */
export const getExtrasData = (category) => {
    return EXTRAS[category] || {};
};

export const getExtrasTotal = (extras) => {
    if (!extras) return 0;
    let sum = 0;
    Object.keys(extras).forEach(function (k) {
        sum += extras[k].price;
    });
    return sum;
}

export const getDefaultDressing = (product) => {
    const cat = hasExtras(product);
    if (!cat) return;
    return !!EXTRAS[cat].dressing && EXTRAS[cat].dressing[0];
}

/**
 * Returns a list of srcs based on passed list of objects
 * @param {Array} images 
 */
export const srcList = images => images.map(m => m.src);

/**
 * Product categories
 */
export const CATEGORIES = [
    "parfaits",
    "salads",
    "sandwiches",
    "smoothies",
];

/**
 * Return a product's first valid category
 * @param {object} product 
 */
export const getCategory = (product) => {
    let cats = [];
    product.categories.map(c => {
        cats.push(c.name.toLowerCase());
    });
    for (let c of cats) {
        if (CATEGORIES.indexOf(c) !== -1) {
            return c;
        }
    }
    return false;
};

/**
 * Helper for accessing stored category filter
 */
export const getActiveFilter = () => db.getSync(CACHE.DB_KEY_FILTER_CATEGORY) || '';