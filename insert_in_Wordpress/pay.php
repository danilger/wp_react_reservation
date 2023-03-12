<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Authorization, Origin, X-Requested-With, Content-Type, Accept");
?>
<?php
/* раскомментировать в продакшен*/
/* 
$allowedReferer = "your_site.com";

if ($_SERVER['HTTP_HOST'] !== $allowedReferer) {
  http_response_code(403);
  die("Access forbidden.");
}*/

$idempotenceKey = uniqid();
$curl = curl_init();


curl_setopt_array($curl, [
  CURLOPT_URL => "https://api.yookassa.ru/v3/payments",
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_POSTFIELDS => file_get_contents("php://input"),/*$postFields,*/
  CURLOPT_HTTPHEADER => [
    "Authorization: Basic " . base64_encode("<your_api_key_from_yookassa>"),
    "Content-Type: application/json",
    "Idempotence-Key: " . $idempotenceKey
  ]
]);

$response = curl_exec($curl);
curl_close($curl);

echo $response;




/*
//пример запроса для отправки js с фронта
fetch('https://yout_site.com/pay.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    amount: {
      value: '100.00',
      currency: 'RUB'
    },
    capture: true,
    confirmation: {
      type: 'redirect',
      return_url: 'http://yout_site.com/'
    },
    description: 'Order #1'
  })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });

*/




?>