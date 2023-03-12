const changeTimeFormat = (timeWithMs) =>
  new Date(`1970-01-01T${timeWithMs}`).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export default changeTimeFormat;
