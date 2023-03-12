<?php

add_action('rest_api_init', function () {
    register_rest_route('reservation/v1', '/time_list/', array(
        'methods' => 'GET',
        'callback' => 'get_time_list',
    ));
});

function get_time_list($request)
{

    $serchFor = date("Y-m-d", strtotime($request->get_param('date')));


    if (!isset($serchFor)) {
        return 'date is not set';
    };

    $args = array(
        'post_type' => 'reservation',
        'meta_query' => array(
            array(
                'key' => 'time_start',
                'value' => $serchFor,
                'compare' => 'LIKE'
            )
        ),
        'meta_key' => 'time_start',
        'orderby' => 'meta_value',
        'order' => 'DESC'
    );

    $query = new WP_Query($args);

    $data = [];
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $data[] = [get_field('time_start'), get_field('time_end')];
        }
    } else {
        return ('Нет результатов для запроса ' . $serchFor);
    }

    wp_reset_postdata();


    return ($data);
}


/* пример запроса с фронта

fetch("https://your_site.com/wp-json/reservation/v1/time_list?date=111")
  .then(response => response.json())
  .then(result => console.dir(result))
  .catch(error => console.log('error', error));*/