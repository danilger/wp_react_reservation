let schedule = () => {
  let schedule = [...new Array(12).keys()];
  schedule = schedule.map((_, k) => [
    [
      `${k + 9 <= 9 ? "0" + (k + 9) : k + 9}:00`,
      `${k + 10 <= 9 ? "0" + (k + 10) : k + 10}:00`,
    ],
    true,
  ]);
  return schedule;
};

export default schedule;
