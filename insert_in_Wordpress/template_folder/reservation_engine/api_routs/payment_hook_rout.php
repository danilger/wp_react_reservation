<?php
/* веб хук для подтверждения оплаты от юкассы, меняет статус брони и  */

function ip_in_range($ip, $range)
{
    if (strpos($range, '/') === false) {
        $range .= '/32';
    }

    list($subnet, $bits) = explode('/', $range);
    $subnet = ip2long($subnet);
    $mask = -1 << (32 - $bits);
    $subnet &= $mask;
    $ip = ip2long($ip);
    $ip &= $mask;

    return $subnet == $ip;
}


function register_yookassa_webhook(WP_REST_Request $request)
{

    // Получаем IP-адрес запроса
    $ip_address = $_SERVER['REMOTE_ADDR'];

    // Получаем тело запроса
    $body = $request->get_body();

    // Получаем текущую дату и время
    $now = date('Y-m-d H:i:s');

    // Сохраняем данные в файл log.php
    $data = $now . '/' . $ip_address . ' - ' . $body;
    $file = __DIR__ . '/log.php';
    file_put_contents($file, $data . PHP_EOL, FILE_APPEND | LOCK_EX);

    // Проверяем, что IP-адрес находится в одном из разрешенных диапазонов
    $allowed_ips = array(
        '185.71.76.0/27',
        '185.71.77.0/27',
        '77.75.153.0/25',
        '77.75.156.11',
        '77.75.156.35',
        '77.75.154.128/25',
        '2a02:5180::/32',
        '77.75.153.78'
    );
    //'77.75.153.78' - это тестовый ip убрать после отладки

    $ip_allowed = false;
    foreach ($allowed_ips as $allowed_ip) {
        if (ip_in_range($ip_address, $allowed_ip)) {
            $ip_allowed = true;
            break;
        }
    }
    if (!$ip_allowed) {
        // Возвращаем ошибку, если IP-адрес не разрешен
        return new WP_Error('invalid_ip', 'IP-адрес не разрешен', array('status' => 403));
    }


    $body = json_decode($body);
    $ids = json_decode(explode("№", $body->object->description)[1]);

    //добавляем метку об оплате
    function add_tags_to_posts($idarr, $tag)
    {
        foreach ($idarr as $id) {
            wp_set_object_terms((int)$id, $tag, 'reservations');
            wp_update_post([
                'ID' => $id,
                'post_status' => 'publish'
            ]);
        }
    }

    if ($body->event == 'payment.succeeded') {
        add_tags_to_posts($ids, 'Оплачено на сайте.');
    } else {
        add_tags_to_posts($ids, 'Оплата на сайте не прошла!!!');
    }


    // Возвращаем успешный ответ
    return array('status' => 'success');
}

// Регистрируем API-маршрут
add_action('rest_api_init', function () {
    register_rest_route('yookassa/v1', '/webhook', array(
        'methods' => 'POST',
        'callback' => 'register_yookassa_webhook',
    ));
});
