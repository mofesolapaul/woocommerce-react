<?php if ( ! defined( 'WP_DEBUG' ) ) {
	die( 'Direct access forbidden.' );
}

function let_cors_live_sil_vous_plait() {
	remove_filter( 'rest_pre_serve_request', 'rest_send_cors_headers' );
	add_filter( 'rest_pre_serve_request', function( $value ) {
		header( 'Access-Control-Allow-Origin: *' );
		header( 'Access-Control-Allow-Methods: OPTIONS', false );
		header( 'Access-Control-Allow-Credentials: true' );
		header( 'Access-Control-Max-Age: 86400' );
		return $value;
	} );
}
add_action( 'rest_api_init', 'let_cors_live_sil_vous_plait', 15 );

// function my_modify_rest_routes( $routes ) {
//   array_push( $routes['/wc/v2/products'][0]['args']['orderby']['enum'], 'meta_value_num' );
//   return $routes;
// }
// add_filter('rest_endpoints', 'my_modify_rest_routes');

add_filter('rest_endpoints', function ($routes) {
            // I'm modifying multiple types here, you won't need the loop if you're just doing posts
            foreach (['products'] as $type) {
                if (!($route =& $routes['/wc/v2/' . $type])) {
                    continue;
                }

                // Allow ordering by my meta value
                $route[0]['args']['orderby']['enum'][] = 'meta_value';

                // Allow only the meta keys that I want
                $route[0]['args']['meta_key'] = array(
                    'description'       => 'The meta key to query.',
                    'type'              => 'string',
                    'enum'              => ['total_sales','_price'],
                    'validate_callback' => 'rest_validate_request_arg',
                );
            }

            return $routes;
        });

// add custom fields query to WP REST API v2
// https://1fix.io/blog/2015/07/20/query-vars-wp-api/
// function my_allow_meta_query( $valid_vars ) {
//     $valid_vars = array_merge( $valid_vars, array( 'meta_key', 'meta_value' ) );
//     return $valid_vars;
// }
// add_filter( 'rest_query_vars', 'my_allow_meta_query' );

// add_action('woocommerce_checkout_create_order', 'before_checkout_create_order', 20, 2);
add_action('woocommerce_rest_insert_shop_order_object', 'before_checkout_create_order', 20, 2);
function before_checkout_create_order( $order, $data ) {
    // $order->update_meta_data( '_custom_meta_key', 'value' );
    write_log("ORDER");
    $xtras_cost = 0;
    foreach ($order->get_items() as $item_id => $item_data) {
    
        // Get an instance of corresponding the WC_Product object
        // $product = $item_data->get_product();
        // $product_name = $product->get_name(); // Get the product name
        
        // Remember previous
        $item_total = $item_data->get_total(); // Get the item line total
        $item_subtotal = $item_data->get_subtotal(); // Get the item line subtotal
        $item_quantity = $item_data->get_quantity(); // Get the item quantity
            
        // Needs update? a.k.a. Has Meta?
        if (!!count($meta = $item_data->get_meta_data())) {
            $cost = 0;
            $xtras = $meta[0]->get_data()["value"];
            foreach ($xtras as $x) {
                $cost += $x["price"]? $x["price"]:0;
            }
            
            // adjust extras cost based on quantity
            $cost *= $item_quantity;
            
            // Tweak price
            $xtras_cost += $cost;
            $item_data->set_subtotal($item_subtotal + $cost);
            $item_data->set_total($item_total + $cost);
            $item_data->save();
        }
    
        write_log([$item_total,$item_subtotal,$item_quantity]);
        // Displaying this data (to check)
        // write_log('Product name: '.$product_name.' | Quantity: '.$item_quantity.' | Item total: '. number_format( $item_total, 2 ));
        // write_log($item_data);
    }
    $order_total = $order->get_total();
    $order->set_total($order_total + $xtras_cost);
    $order->save();
    write_log("DATA");
    // write_log($data);
}

if (!function_exists('write_log')) {
    function write_log ( $log )  {
//        if ( true === WP_DEBUG ) {
            if ( is_array( $log ) || is_object( $log ) ) {
                error_log( print_r( $log, true ) );
            } else {
                error_log( $log );
            }
        }
//    }
}

add_filter("woocommerce_get_order_item_totals", function() {
    write_log("TOTALS");
});