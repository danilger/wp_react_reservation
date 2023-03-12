export let saveAllDays = async (name, phone, days) => {
  const promises = days.map(async (day) => {
    const response = await fetch(
      "https://yor_site.com/wp-json/reservation/v1/reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time_start: `${day} 00:01:00`,
          time_end: `${day} 23:59:00`,
          name: `Бронь сутки ${name}`,
          phone: phone,
        }),
      }
    );
    return response.json();
  });

  const results = await Promise.all(promises);

  return results;
};
