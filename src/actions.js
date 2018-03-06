import flux from 'flux-react'

export default flux.createActions([
    'addToCart',
    'removeFromCart',
    'deleteOrder',
    'updateQty',
    'checkout',
    'getShippingMethods',
])