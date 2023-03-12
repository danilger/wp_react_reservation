export const countHoursInIntervals = (intervals) => {
  return (
    intervals.reduce(
      (acc, curr) =>
        acc +
        (new Date(`1970-01-01T${curr[1]}:00Z`) -
          new Date(`1970-01-01T${curr[0]}:00Z`)),
      0
    ) /
    (1000 * 60 * 60)
  );
};
