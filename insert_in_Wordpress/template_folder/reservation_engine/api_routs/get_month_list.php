<?php

/*

Этот роут получает месяц и год, в ответ возвращает массив дней в которых есть другие брони
в формате [1,2,3,10]

*/


//регистрируем роут 
add_action('rest_api_init', function () {
    register_rest_route('reservation/v1', '/month_list/', [
        'method' => 'GET',
        'callback' => 'get_month_list',
    ]);
});


//колбэк для роута
function get_month_list($request)
{


    // получаем месяц и год из get запроса
    $month = $request->get_param('month');
    $month = (int)$month < 10 ? '0' . $month : $month;
    $year = $request->get_param('year');

    // создаем фильтр для поиска броней на начало и конец даты
    $args = array(
        'post_type' => 'reservation',
        'meta_query' => array(
            array(
                'key' => 'time_start',
                'value' => "{$year}-{$month}",
                'compare' => 'LIKE'
            ),
            array(
                'key' => 'time_end',
                'value' => "{$year}-{$month}",
                'compare' => 'LIKE'
            )
        ),
    );

    // формируем массив data периодов из полученых броней в формате [["13/03/2023 00:00:00","19/03/2023 00:00:00"],["10/03/2023 11:00:00","10/03/2023 12:00:00"]]
    $query = new WP_Query($args);

    $data = [];
    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $data[] = [get_field('time_start'), get_field('time_end')];
        }
    }
    wp_reset_postdata();



    // создаем массив days в формате [1,2,3,4] в котором перечислены все даты из периодов массива data
    $days = [];

    //функция форматирует дату из 13/03/2023 00:00:00 в 1678665600
    function dateFormat($d)
    {
        return (DateTime::createFromFormat('d/m/Y H:i:s', $d)->getTimestamp());
    }
    //формируем массив days
    foreach ($data as $range) {
        for ($i = dateFormat($range[0]); $i <= dateFormat($range[1]); $i += 86400) {
            $day = date('d', $i);
            if (!in_array($day, $days)) {
                $days[] = $day;
            }
        }
    }


    sort($days);

    return ($days);
}
