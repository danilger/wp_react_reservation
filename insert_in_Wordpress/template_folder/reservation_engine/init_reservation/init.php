<?php

// создаем тип записи и добавляем таксономию

add_action( 'init', 'reservation' );
 
function reservation() {
 
	$args = array(
		'labels' => array(
			'menu_name' => 'Бронь'
		),
		'public' => true,
		'show_in_nav_menus'=> false,
		'menu_position'=> 4,
		'supports'=> ['title'],
		'menu_icon' => 'dashicons-clock'
	);
	register_post_type( 'reservation', $args );
}



add_action( 'init', 'true_register_taxonomy' );
 
function true_register_taxonomy() {
 
	$args = array(
		'labels' => array(
			'menu_name' => 'Брони'
		),
		'public' => true,
	);
	register_taxonomy( 'reservations', 'reservation', $args );
}

// добавляем столбец меток в админке
add_filter( 'manage_reservation_posts_columns', 'add_reservation_tags_column' );
function add_reservation_tags_column( $columns ) {
    $columns['reservation_tags'] = 'Статус оплаты';
    return $columns;
}

// выводим метки в столбце
add_action( 'manage_reservation_posts_custom_column', 'show_reservation_tags_column', 10, 2 );
function show_reservation_tags_column( $column_name, $post_id ) {
    if ( $column_name === 'reservation_tags' ) {
        $tags = get_the_term_list( $post_id, 'reservations', '', ', ', '' );
        echo $tags;
    }
}

 

//подключаем роуты

require_once __DIR__ . '/../api_routs/create_or_update_reservation.php';
require_once __DIR__ . '/../api_routs/get_time_list.php';
require_once __DIR__ . '/../api_routs/payment_hook_rout.php';
require_once __DIR__ . '/../api_routs/get_month_list.php';


?>