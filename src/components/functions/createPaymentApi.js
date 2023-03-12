export let createPaymentApi = (amount, ids) => {
  fetch("https://yor_site.com/pay.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: {
        value: amount,
        currency: "RUB",
      },
      capture: true,
      confirmation: {
        type: "redirect",
        return_url: "https://yor_site.com",
      },
      description: `Оплата бронирования №${ids}`,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.open(data.confirmation.confirmation_url);
    });
};
