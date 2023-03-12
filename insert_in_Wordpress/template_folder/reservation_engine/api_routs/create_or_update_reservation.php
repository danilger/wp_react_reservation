<?php
require('checking_availability.php');

// Добавление нового API роута
add_action('rest_api_init', function () {
  register_rest_route('reservation/v1', '/reservation/', array(
    'methods' => 'POST',
    'callback' => 'create_or_update_reservation',
  ));
});

// Функция для создания или обновления записи типа reservation
function create_or_update_reservation($request)
{
  // Получение параметров из запроса
  $time_start = $request->get_param('time_start');
  $time_end = $request->get_param('time_end');
  $name = $request->get_param('name');
  $phone = $request->get_param('phone');

  if (!checking_availability($time_start, $time_end)) {
    return false;
  }

  // Создание новой записи
  $post = array(
    'post_title' => "{$time_start} - {$time_end} {$name} {$phone}",
    'post_type' => 'reservation',
    'post_status' => 'pending',
  );

  $post_id = wp_insert_post($post);

  update_field('name', $name, $post_id);
  update_field('time_start', $time_start, $post_id);
  update_field('time_end', $time_end, $post_id);
  update_field('phone', $phone, $post_id);

  return $post_id;
}

/*пример запроса

fetch('http://your_site.com/wp-json/reservation/v1/reservation', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    time_start: '03/02/2023 14:15:01',
    time_end: '03/02/2023 14:15:00',
    name: 'тест',
    phone: 'тест',
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error))

*/
