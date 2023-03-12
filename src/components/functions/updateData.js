import { transformDateToDb } from "./transformDateToDb";

export let updateDate = async (date, intervals, name, phone) => {
  date = transformDateToDb(date);

  const promises = intervals.map(async (interval) => {
    const response = await fetch(
      "https://yor_site.com/wp-json/reservation/v1/reservation",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          time_start: `${date} ${interval[0]}:00`,
          time_end: `${date} ${interval[1]}:00`,
          name: name,
          phone: phone,
        }),
      }
    );
    return response.json();
  });

  const results = await Promise.all(promises);

  return results;
};
