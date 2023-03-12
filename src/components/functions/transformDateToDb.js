//04/03/2023 ->2023-03-04
export let transformDateToDb = (inputDate = "04/03/2023") => {
  const date = new Date(inputDate.split("/").reverse().join("-"));
  const formattedDate = date.toLocaleDateString("sv-SE");
  return formattedDate;
};
