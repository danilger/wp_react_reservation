//import format from "date-fns/format";

const isAvailable = (selected, slot, reservedTimeList) => {
  let setNewDate = (d) => {
    // функция переводи в формат Date() из '28/02/2023 00:01:00'
    let dateAndTime = d.split(" ");
    let date = dateAndTime[0].split("/");
    let day = date[0];
    let month = date[1];
    let year = date[2];
    let time = dateAndTime[1].split(":");
    let hour = time[0];
    let minuts = time[1];
    return new Date(`${year}-${month}-${day}T${hour}:${minuts}:00+05:00`);
  };

  reservedTimeList.forEach((reservation) => {
    {
      let startReservation = setNewDate(reservation[0]); // переводим в формат Date() из '28/02/2023 00:01:00'
      let endReservation = setNewDate(reservation[1]);

      let year = selected.getFullYear();
      let month =
        selected.getMonth() < 10
          ? "0" + (selected.getMonth() + 1)
          : selected.getMonth() + 1;
      let day =
        selected.getDate() < 10 ? "0" + selected.getDate() : selected.getDate();

      let startSlot = new Date(
        `${year}-${month}-${day}T${slot[0][0].split(":")[0]}:00+05:00`
      );

      let endSlot = new Date(
        `${year}-${month}-${day}T${slot[0][1].split(":")[0]}:00+05:00`
      );

      let SS = startSlot.getTime(); // мс время старта слота
      let ES = endSlot.getTime(); // мс время окончания слота
      let SR = startReservation.getTime(); // мс время старта брони
      let ER = endReservation.getTime(); // мс время конца брони

      if (!(SR >= ES || ER <= SS)) {
        slot[1] = false;
      }
    }
  });

  return slot;
};

export default isAvailable;
