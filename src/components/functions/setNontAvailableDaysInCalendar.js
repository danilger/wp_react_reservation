export let setNontAvailableDaysInCalendar = async (date) => {
  // месча 0-11 !!! при переключени в процессе
  let dates = await fetch(
    `https://yor_site.com/wp-json/reservation/v1/month_list?month=${
      date.getMonth() + 1
    }&year=${date.getFullYear()}`
  )
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
      return false;
    });

  dates = dates.map((d) => new Date(date.getFullYear(), date.getMonth(), d));
  return dates;
};
