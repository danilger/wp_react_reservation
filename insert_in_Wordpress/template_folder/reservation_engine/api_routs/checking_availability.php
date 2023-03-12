<?php
function checking_availability($start, $end) {
    if (empty($start) || empty($end)) {
        return false;
    }

    $start = strtotime($start);
    $end = strtotime($end);

    if ($start >= $end) {
        return false;
    }

    $args = [
        'post_type' => 'reservation',
        'posts_per_page' => -1
    ];

    $query = new WP_Query($args);

    $check = 0;

    while ($query->have_posts()) {
        $query->the_post();
        $time_start = strtotime(get_field('time_start'));
        $time_end = strtotime(get_field('time_end'));
        
        if (!empty($time_start) && !empty($time_end) && ($start >= $time_start && $start <= $time_end || $end >= $time_start && $end <= $time_end)) {
            $check++;
        }
    }

    wp_reset_postdata();

    if ($check == 0) {
        return true;
    } else {
        return false;
    }
}
