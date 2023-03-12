export let ArangeIntervals = (inputSet) => {
  const inputArr = Array.from(inputSet).sort();
  const outputArr = [];

  let start = inputArr[0];
  let end = inputArr[0];

  for (let i = 1; i < inputArr.length; i++) {
    const prev = inputArr[i - 1];
    const curr = inputArr[i];

    if (prev !== curr && curr === addHours(prev, 1)) {
      end = curr;
    } else {
      outputArr.push([start, addHours(end, 1)]);
      start = curr;
      end = curr;
    }
  }

  outputArr.push([start, addHours(end, 1)]);

  function addHours(time, hours) {
    const [hoursStr, minutesStr] = time.split(":");
    const totalMinutes =
      parseInt(hoursStr, 10) * 60 + parseInt(minutesStr, 10) + hours * 60;
    const newHours = Math.floor(totalMinutes / 60)
      .toString()
      .padStart(2, "0");
    const newMinutes = (totalMinutes % 60).toString().padStart(2, "0");
    return `${newHours}:${newMinutes}`;
  }

  return outputArr;
};
